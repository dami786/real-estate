import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { api } from '../../api/client';

export default function TeamVerify() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.getAdminLeads().then(setLeads);
  }, []);

  const verify = async (id) => {
    await api.updateLead(id, { status: 'active' });
    api.getAdminLeads().then(setLeads);
  };

  return (
    <DashboardLayout title="Verify Leads" panel="team">
      <h1 className="text-2xl font-bold">Verify Leads</h1>
      <p className="text-gray-500 mt-1">Review and approve leads before marketplace listing.</p>

      <div className="mt-6 space-y-4">
        {leads.map((l) => (
          <div key={l._id} className="bg-white rounded-2xl border p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold">{l.city}, {l.state}</p>
              <p className="text-sm text-gray-500">{l.ownerName} · {l.ownerPhone}</p>
            </div>
            <button onClick={() => verify(l._id)} className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
              <CheckCircle size={16} /> Verify
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
