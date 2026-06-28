<?php
/**
 * MarketerG AI — Claude API proxy.
 *
 * Keeps your Anthropic API key SERVER-SIDE so it's never exposed in the browser.
 * The website chatbot POSTs here; this script calls Claude and returns the reply.
 *
 * SETUP (do this on the Hostinger server, never commit your key to git):
 *   1. Set an environment variable ANTHROPIC_API_KEY in hPanel (Advanced → ...),
 *      OR create a file `api/secret.php` (gitignored) that does:
 *        <?php return 'sk-ant-...your-key...';
 *   2. Make sure outbound HTTPS (cURL) is allowed on your hosting plan.
 *
 * COST/ABUSE NOTE: this is a public endpoint — every message costs money.
 * Keep the per-message cap low (below) and consider adding rate limiting before
 * enabling live chat on a high-traffic page.
 */

header('Content-Type: application/json');

// --- Only allow POST from same origin ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
  exit;
}

// --- Load the API key (env var first, then optional secret.php) ---
$apiKey = getenv('ANTHROPIC_API_KEY');
if (!$apiKey && file_exists(__DIR__ . '/secret.php')) {
  $apiKey = require __DIR__ . '/secret.php';
}
if (!$apiKey) {
  http_response_code(500);
  echo json_encode(['error' => 'API key not configured']);
  exit;
}

// --- Read and validate input ---
$body = json_decode(file_get_contents('php://input'), true);
$messages = isset($body['messages']) && is_array($body['messages']) ? $body['messages'] : [];
if (empty($messages)) {
  http_response_code(400);
  echo json_encode(['error' => 'No messages']);
  exit;
}
// Trim history + cap length to control cost.
$messages = array_slice($messages, -10);
foreach ($messages as &$m) {
  if (isset($m['content'])) $m['content'] = mb_substr((string)$m['content'], 0, 1000);
}
unset($m);

$system = "You are the MarketerG AI assistant on ai.marketerg.com. "
  . "MarketerG builds AI automation, AI chatbots/agents, AI-powered marketing, and custom AI solutions for businesses — combining AI speed with human strategy. "
  . "Be warm, concise (2-4 sentences), and helpful. Qualify the visitor's need and nudge them toward booking a free AI audit via the contact page or WhatsApp. "
  . "Pricing is custom per project — never quote fixed prices; suggest the free AI audit instead. Don't make up facts about the company.";

$payload = json_encode([
  'model'      => 'claude-haiku-4-5-20251001',
  'max_tokens' => 300,
  'system'     => $system,
  'messages'   => $messages,
]);

// --- Call the Anthropic API ---
$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST           => true,
  CURLOPT_POSTFIELDS     => $payload,
  CURLOPT_TIMEOUT        => 30,
  CURLOPT_HTTPHEADER     => [
    'content-type: application/json',
    'x-api-key: ' . $apiKey,
    'anthropic-version: 2023-06-01',
  ],
]);
$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status !== 200) {
  http_response_code(502);
  echo json_encode(['error' => 'Upstream error', 'status' => $status]);
  exit;
}

$data  = json_decode($response, true);
$reply = $data['content'][0]['text'] ?? '';
echo json_encode(['reply' => $reply]);
