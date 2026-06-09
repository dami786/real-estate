import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { api } from '../../api/client';
import { formatPrice, typeLabel } from '../../utils/format';

const emptyLead = {
  city: '', state: '', propertyType: 'Single Family', beds: 3, baths: 2, sqft: 1500,
  leadType: 'foreclosure', tier: 'premium', estValue: 300000, arv: 380000, price: 299,
  ownerName: '', ownerPhone: '', address: '', exclusive: false, urgent: false,
};

export default function ManageLeads({ panel = 'admin' }) {
  const [leads, setLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyLead);

  const load = () => api.getAdminLeads().then(setLeads);
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.createLead({ ...form, estValue: +form.estValue, arv: +form.arv, price: +form.price, beds: +form.beds, baths: +form.baths, sqft: +form.sqft });
    setShowForm(false);
    setForm(emptyLead);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this lead?')) return;
    await api.deleteLead(id);
    load();
  };

  return (
    <DashboardLayout title="Manage Leads" panel={panel}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Leads</h1>
          <p className="text-gray-500 mt-1">{leads.length} leads in the system.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm">
          <Plus size={16} /> Add Lead
        </button>
      </div>

      {showForm && (
        <form onSubmit={create} className="mt-6 bg-white rounded-2xl border p-6 grid md:grid-cols-3 gap-4">
          {['city', 'state', 'propertyType', 'ownerName', 'ownerPhone', 'address'].map((f) => (
            <input key={f} required={['city', 'state'].includes(f)} placeholder={f} value={form[f]}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              className="px-3 py-2 border rounded-lg text-sm" />
          ))}
          {['beds', 'baths', 'sqft', 'estValue', 'arv', 'price'].map((f) => (
            <input key={f} type="number" placeholder={f} value={form[f]}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              className="px-3 py-2 border rounded-lg text-sm" />
          ))}
          <select value={form.leadType} onChange={(e) => setForm({ ...form, leadType: e.target.value })} className="px-3 py-2 border rounded-lg text-sm">
            {['pre-foreclosure', 'foreclosure', 'probate', 'tax-delinquent', 'absentee-owner', 'vacant', 'abandoned', 'bankruptcy', 'medical', 'distressed'].map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className="px-3 py-2 border rounded-lg text-sm">
            {['basic', 'qualified', 'premium'].map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button type="submit" className="md:col-span-3 py-2.5 bg-black text-white rounded-lg text-sm font-medium">Create Lead</button>
        </form>
      )}

      <div className="mt-6 bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Tier</th>
              <th className="px-6 py-3">Value</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l._id} className="border-t border-gray-50">
                <td className="px-6 py-4 font-medium">{l.city}, {l.state}</td>
                <td className="px-6 py-4 capitalize">{typeLabel(l.leadType)}</td>
                <td className="px-6 py-4 uppercase text-xs font-bold">{l.tier}</td>
                <td className="px-6 py-4">{formatPrice(l.estValue)}</td>
                <td className="px-6 py-4 font-bold">${l.price}</td>
                <td className="px-6 py-4 capitalize">{l.status}</td>
                <td className="px-6 py-4">
                  <button onClick={() => remove(l._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
