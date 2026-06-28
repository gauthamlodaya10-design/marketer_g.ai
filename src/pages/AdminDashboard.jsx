import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, Eye, EyeOff, Mail, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [caseStudies, setCaseStudies] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [csData, certData, msgData, settingsData] = await Promise.all([
        supabase.from('case_studies').select('*').order('created_at', { ascending: false }),
        supabase.from('certifications').select('*').order('year', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('site_settings').select('*')
      ]);

      setCaseStudies(csData.data || []);
      setCertifications(certData.data || []);
      setMessages(msgData.data || []);
      
      const settingsObj = {};
      (settingsData.data || []).forEach(item => {
        settingsObj[item.key] = item.value;
      });
      setSettings(settingsObj);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const deleteCaseStudy = async (id) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    
    try {
      const { error } = await supabase.from('case_studies').delete().eq('id', id);
      if (error) throw error;
      
      toast({ title: 'Success', description: 'Case study deleted' });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const toggleCaseStudyStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      const { error } = await supabase
        .from('case_studies')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: 'Success', description: `Status updated to ${newStatus}` });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    }
  };

  const saveCaseStudy = async (formData) => {
    try {
      if (editingItem?.id) {
        const { error } = await supabase
          .from('case_studies')
          .update(formData)
          .eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('case_studies').insert([formData]);
        if (error) throw error;
      }
      
      toast({ title: 'Success', description: 'Case study saved' });
      setDialogOpen(false);
      setEditingItem(null);
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save', variant: 'destructive' });
    }
  };

  const deleteCertification = async (id) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;
    
    try {
      const { error } = await supabase.from('certifications').delete().eq('id', id);
      if (error) throw error;
      
      toast({ title: 'Success', description: 'Certification deleted' });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const saveCertification = async (formData) => {
    try {
      if (editingItem?.id) {
        const { error } = await supabase
          .from('certifications')
          .update(formData)
          .eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('certifications').insert([formData]);
        if (error) throw error;
      }
      
      toast({ title: 'Success', description: 'Certification saved' });
      setDialogOpen(false);
      setEditingItem(null);
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save', variant: 'destructive' });
    }
  };

  const toggleMessageRead = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update', variant: 'destructive' });
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const { error } = await supabase.from('contact_messages').delete().eq('id', id);
      if (error) throw error;
      
      toast({ title: 'Success', description: 'Message deleted' });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const updateSetting = async (key, value) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key, value, updated_at: new Date().toISOString() });
      
      if (error) throw error;
      toast({ title: 'Success', description: 'Setting updated' });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update setting', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — marketerg.com</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="case-studies" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Case Studies Tab */}
          <TabsContent value="case-studies">
            <div className="mb-4">
              <CaseStudyDialog 
                isOpen={dialogOpen}
                onOpenChange={setDialogOpen}
                onSave={saveCaseStudy}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
              />
            </div>

            <div className="gradient-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-card border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Platform</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card/50">
                    {caseStudies.map((cs) => (
                      <tr key={cs.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 text-sm text-foreground">{cs.title}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {cs.platform?.join(', ') || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            cs.status === 'published' 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-muted/20 text-muted-foreground'
                          }`}>
                            {cs.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {new Date(cs.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="ghost" onClick={() => {
                              setEditingItem(cs);
                              setDialogOpen(true);
                            }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => toggleCaseStudyStatus(cs.id, cs.status)}
                            >
                              {cs.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => deleteCaseStudy(cs.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications">
            <div className="mb-4">
              <CertificationDialog 
                isOpen={dialogOpen}
                onOpenChange={setDialogOpen}
                onSave={saveCertification}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
              />
            </div>

            <div className="gradient-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-card border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Issuer</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Year</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card/50">
                    {certifications.map((cert) => (
                      <tr key={cert.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 text-sm text-foreground">{cert.name}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{cert.issuer}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{cert.year}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            cert.status === 'published' 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-muted/20 text-muted-foreground'
                          }`}>
                            {cert.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="ghost" onClick={() => {
                              setEditingItem(cert);
                              setDialogOpen(true);
                            }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => deleteCertification(cert.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`gradient-border p-4 rounded-lg ${
                  msg.is_read ? 'bg-card/50' : 'bg-card'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{msg.name}</h3>
                        {!msg.is_read && (
                          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">New</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{msg.email}</p>
                      {msg.company && (
                        <p className="text-xs text-muted-foreground">{msg.company}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => toggleMessageRead(msg.id, msg.is_read)}
                      >
                        {msg.is_read ? <Mail className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => deleteMessage(msg.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">
                      {msg.inquiry_type}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{msg.message}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6 max-w-2xl">
              <div className="gradient-border p-6 rounded-lg bg-card">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Resume URL
                </h3>
                <div className="flex gap-2">
                  <Input
                    value={settings.resume_url || ''}
                    onChange={(e) => setSettings({ ...settings, resume_url: e.target.value })}
                    placeholder="https://example.com/resume.pdf"
                    className="bg-input border-border text-foreground"
                  />
                  <Button onClick={() => updateSetting('resume_url', settings.resume_url)}>
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="gradient-border p-6 rounded-lg bg-card">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Availability Status
                </h3>
                <select
                  value={settings.availability_status || 'open'}
                  onChange={(e) => updateSetting('availability_status', e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  <option value="open">Open to Work</option>
                  <option value="closed">Not Available</option>
                </select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function CaseStudyDialog({ isOpen, onOpenChange, onSave, editingItem, setEditingItem }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client_type: '',
    platform: [],
    industry: '',
    timeline: '',
    challenge: '',
    strategy: '',
    execution: '',
    results: [],
    tags: [],
    status: 'draft'
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        title: '',
        slug: '',
        client_type: '',
        platform: [],
        industry: '',
        timeline: '',
        challenge: '',
        strategy: '',
        execution: '',
        results: [],
        tags: [],
        status: 'draft'
      });
    }
  }, [editingItem]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'title' && !editingItem) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => setEditingItem(null)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Case Study
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingItem ? 'Edit' : 'Add'} Case Study</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <Input
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Client Type</label>
              <Input
                value={formData.client_type}
                onChange={(e) => handleChange('client_type', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Industry</label>
              <Input
                value={formData.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Platform (comma-separated)</label>
            <Input
              value={Array.isArray(formData.platform) ? formData.platform.join(', ') : ''}
              onChange={(e) => handleChange('platform', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Timeline</label>
            <Input
              value={formData.timeline}
              onChange={(e) => handleChange('timeline', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Challenge</label>
            <Textarea
              value={formData.challenge}
              onChange={(e) => handleChange('challenge', e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Strategy</label>
            <Textarea
              value={formData.strategy}
              onChange={(e) => handleChange('strategy', e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Execution</label>
            <Textarea
              value={formData.execution}
              onChange={(e) => handleChange('execution', e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <Input
              value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
              onChange={(e) => handleChange('tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <Button type="submit" className="w-full">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CertificationDialog({ isOpen, onOpenChange, onSave, editingItem, setEditingItem }) {
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    year: new Date().getFullYear(),
    category: '',
    skills: [],
    certificate_url: '',
    status: 'published'
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        name: '',
        issuer: '',
        year: new Date().getFullYear(),
        category: '',
        skills: [],
        certificate_url: '',
        status: 'published'
      });
    }
  }, [editingItem]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => setEditingItem(null)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingItem ? 'Edit' : 'Add'} Certification</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Issuer</label>
              <Input
                value={formData.issuer}
                onChange={(e) => handleChange('issuer', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => handleChange('year', parseInt(e.target.value))}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            >
              <option value="">Select Category</option>
              <option value="AI & Technology">AI & Technology</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Skills (comma-separated)</label>
            <Input
              value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''}
              onChange={(e) => handleChange('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Certificate URL (optional)</label>
            <Input
              value={formData.certificate_url}
              onChange={(e) => handleChange('certificate_url', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            >
              <option value="published">Published</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
          <Button type="submit" className="w-full">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}