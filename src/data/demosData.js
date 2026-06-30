// Content for the Demos page — themed scripted chatbots per industry.
// Each bot is the same engine, "trained" for a different business — pure showcase, no API needed.

export const industryBots = [
  {
    id: 'dental',
    label: 'Dental Clinic',
    emoji: '🦷',
    botName: 'BrightSmile Assistant',
    greeting: "Hi! 👋 Welcome to BrightSmile Dental. I can book appointments, answer treatment questions, or share our timings. How can I help?",
    suggestions: ['Book an appointment', 'Do you do whitening?', 'What are your timings?'],
    replies: [
      { re: /book|appoint|slot|schedule/i, reply: 'I can book that! We have openings tomorrow at 11:00 AM and 4:00 PM. Could I take your name and number to confirm?' },
      { re: /whiten|clean|brace|implant|treatment|root canal/i, reply: 'Yes — we offer whitening, cleaning, braces and implants. Whitening starts at ₹4,999. Want me to set up a consultation?' },
      { re: /time|timing|open|hour|when/i, reply: "We're open Mon–Sat, 10 AM to 8 PM. Sundays by appointment only. 🙂" },
      { re: /price|cost|fee|charge/i, reply: 'Consultations are ₹300 (adjusted against any treatment). Which treatment are you curious about?' },
      { re: /pain|emergency|urgent|hurt/i, reply: 'Sorry to hear that! We keep same-day slots for emergencies — can you come in today at 5 PM?' },
    ],
    fallback: 'Happy to help! I can book an appointment, explain treatments, or share our timings. 😊',
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    emoji: '🍽️',
    botName: 'Spice Garden Host',
    greeting: 'Hey! 👋 Welcome to Spice Garden. Want to book a table, peek at the menu, or order takeaway?',
    suggestions: ['Book a table', 'Tonight’s specials?', 'Do you deliver?'],
    replies: [
      { re: /book|table|reserve|seat/i, reply: 'Sure! For how many people and what time? We have tables free tonight from 7 PM. 🍷' },
      { re: /menu|dish|food|veg|special|biryani/i, reply: "Tonight's specials: Paneer Tikka, Butter Chicken, and our famous Hyderabadi Biryani. Want the full menu?" },
      { re: /deliver|takeaway|order|parcel/i, reply: 'Yes, we deliver within 5 km! You can order on our site or WhatsApp — shall I share the link?' },
      { re: /time|open|hour|close/i, reply: "We're open 12 PM–11 PM daily. Kitchen closes at 10:30 PM." },
      { re: /price|cost|much/i, reply: 'Mains are ₹220–₹450, and our thali is ₹299. Want me to recommend something? 😋' },
    ],
    fallback: 'I can book a table, show the menu, or set up delivery. What would you like? 🍛',
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    emoji: '🏠',
    botName: 'PropFinder',
    greeting: 'Hi! 👋 Looking to buy, rent, or sell? Tell me what you need and I’ll point you to the right options.',
    suggestions: ['I want to buy a 2BHK', 'Rentals under ₹25k', 'Book a site visit'],
    replies: [
      { re: /buy|purchase|flat|apartment|villa|house|bhk/i, reply: "Great! What's your budget and preferred area? I have a few 2BHKs that just listed I think you'll like." },
      { re: /rent|rental|lease/i, reply: 'We have rentals from ₹15k–₹40k. Which area and budget? I can shortlist a few and share photos.' },
      { re: /sell|valuation|list my/i, reply: 'I can get your property valued and listed. May I take your details for our agent to call you back?' },
      { re: /visit|site|tour|see/i, reply: 'Happy to arrange a site visit! Which property, and what day works for you?' },
      { re: /price|budget|loan|emi/i, reply: 'Prices vary by area — share your budget and I’ll match listings. We also help arrange home loans. 🏦' },
    ],
    fallback: 'I can help you buy, rent, sell, or book a site visit. What’s on your mind? 🏡',
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    emoji: '🛍️',
    botName: 'ShopAssist',
    greeting: "Hi! 👋 Need help with an order, a product, or a return? I'm here 24/7.",
    suggestions: ["Where's my order?", 'Is this in size M?', 'How do returns work?'],
    replies: [
      { re: /order|track|where|shipping|deliver|status/i, reply: 'Sure! Share your order number and I’ll track it — most orders arrive in 3–5 days. 📦' },
      { re: /size|stock|available|colour|color|medium|large/i, reply: 'Let me check… yes, that’s in stock in M and L! Want me to add it to your cart?' },
      { re: /return|refund|exchange/i, reply: 'Easy 7-day returns! I can start one now — what’s your order number?' },
      { re: /discount|coupon|offer|sale|promo/i, reply: 'Use code AI10 for 10% off your first order. 🎉 Anything you’re eyeing?' },
      { re: /payment|cod|cash|upi/i, reply: 'We accept UPI, cards, and Cash on Delivery. Need help checking out?' },
    ],
    fallback: 'I can track orders, check stock, handle returns, or share offers. What do you need? 🛒',
  },
];
