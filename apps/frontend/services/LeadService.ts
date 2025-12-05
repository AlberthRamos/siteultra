// MongoDB Lead Service
export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role?: string;
  service: string;
  source_page: string;
  created_at: Date;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export class MongoDBLeadService {
  private readonly API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  async save(lead: Lead): Promise<void> {
    try {
      const response = await fetch(`${this.API_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Lead saved to MongoDB:', data.leadId);

      return data;
    } catch (error) {
      console.error('❌ Error saving lead to MongoDB:', error);
      throw error;
    }
  }

  async getAll(filters?: { status?: string; service?: string }): Promise<Lead[]> {
    try {
      const params = new URLSearchParams(filters as any);
      const response = await fetch(`${this.API_URL}/api/leads?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('❌ Error fetching leads:', error);
      return [];
    }
  }

  async getAnalytics(): Promise<any> {
    try {
      const response = await fetch(`${this.API_URL}/api/analytics`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('❌ Error fetching analytics:', error);
      return null;
    }
  }
}

// Main Lead Service (uses MongoDB)
export class LeadService {
  private storage: MongoDBLeadService;

  constructor() {
    this.storage = new MongoDBLeadService();
  }

  async saveLead(lead: Lead): Promise<void> {
    // Save to MongoDB
    await this.storage.save(lead);

    // Track with analytics
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'lead_captured', {
        event_category: 'engagement',
        event_label: lead.service,
        value: 1,
      });
    }

    // Track with Meta Pixel
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'Lead', {
        content_name: lead.service,
        content_category: 'Lead Form',
      });
    }
  }

  async getLeads(filters?: { status?: string; service?: string }): Promise<Lead[]> {
    return this.storage.getAll(filters);
  }

  async getAnalytics(): Promise<any> {
    return this.storage.getAnalytics();
  }
}

export default LeadService;
