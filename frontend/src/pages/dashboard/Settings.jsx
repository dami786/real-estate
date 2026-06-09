import DashboardLayout from '../../components/DashboardLayout';

export default function Settings() {
  return (
    <DashboardLayout title="Settings">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-gray-500 mt-1">Manage your account preferences.</p>

      <div className="mt-8 space-y-6 max-w-xl">
        {[
          ['Email Notifications', 'Receive updates about new leads and purchases'],
          ['SMS Alerts', 'Get text alerts for premium lead listings'],
          ['Weekly Digest', 'Summary of market activity and new leads'],
        ].map(([title, desc]) => (
          <div key={title} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between">
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
