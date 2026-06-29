import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Web3Forms — submissions are emailed to you (same key as the chatbot lead capture).
const WEB3FORMS_KEY = '71a73b5c-353f-4e1a-bc32-9c6556648f15';

export default function ContactForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiry_type: 'AI Automation',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New contact form — ${formData.inquiry_type}`,
          from_name: 'MarketerG AI Website',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          inquiry_type: formData.inquiry_type,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error('submit failed');

      toast({
        title: 'Request Sent!',
        description: "Thanks for reaching out — we'll get back to you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        company: '',
        inquiry_type: 'AI Automation',
        message: ''
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Name <span className="text-destructive">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-input border-border text-foreground"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email <span className="text-destructive">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-input border-border text-foreground"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
          Company / Organization
        </label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="bg-input border-border text-foreground"
          placeholder="Your company name (optional)"
        />
      </div>

      <div>
        <label htmlFor="inquiry_type" className="block text-sm font-medium text-foreground mb-2">
          What do you need? <span className="text-destructive">*</span>
        </label>
        <select
          id="inquiry_type"
          name="inquiry_type"
          value={formData.inquiry_type}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="AI Automation">Workflow Automation</option>
          <option value="AI Chatbot / Agent">AI Chatbot / Agent</option>
          <option value="AI Marketing">AI-Powered Marketing</option>
          <option value="Custom AI Solution">Custom AI Solution</option>
          <option value="Free AI Audit">Free AI Audit</option>
          <option value="Not Sure Yet">Not Sure Yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="bg-input border-border text-foreground resize-none"
          placeholder="Tell us about your business — what you do, your city, and what you're hoping to achieve..."
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
      >
        {loading ? 'Sending...' : (
          <>
            Send Message
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}