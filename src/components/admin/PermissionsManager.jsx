import React, { useState } from 'react';
import { usePermissions } from '../../context/PermissionsContext';
import Card from '../common/Card';
import { ShieldAlert, Save, Eye, Plus, Edit2, Trash2, Download } from 'lucide-react';

const ACTION_DEFS = [
  { key: 'view',   label: 'V', title: 'View',   color: { on: 'bg-blue-500/20 text-blue-400 border-blue-500/40',    off: 'bg-surface-container border-outline-variant text-on-surface-variant/30' } },
  { key: 'create', label: 'C', title: 'Create', color: { on: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', off: 'bg-surface-container border-outline-variant text-on-surface-variant/30' } },
  { key: 'edit',   label: 'E', title: 'Edit',   color: { on: 'bg-amber-500/20 text-amber-400 border-amber-500/40',   off: 'bg-surface-container border-outline-variant text-on-surface-variant/30' } },
  { key: 'delete', label: 'D', title: 'Delete', color: { on: 'bg-rose-500/20 text-rose-400 border-rose-500/40',     off: 'bg-surface-container border-outline-variant text-on-surface-variant/30' } },
  { key: 'export', label: 'X', title: 'Export', color: { on: 'bg-violet-500/20 text-violet-400 border-violet-500/40', off: 'bg-surface-container border-outline-variant text-on-surface-variant/30' } },
];

export default function PermissionsManager() {
  const { permissions, updatePermissions, loading } = usePermissions();
  const [localPerms, setLocalPerms] = useState(permissions);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (permissions) setLocalPerms(permissions);
  }, [permissions]);

  if (loading || !localPerms) return <div className="p-8 text-on-surface-variant">Loading permissions...</div>;

  const roles = ['Manager', 'Sales', 'Operations', 'Support', 'Accounts', 'Logistics', 'Partner', 'Customer', 'Business Client'];
  const modules = [
    { id: 'dashboard',     label: 'Dashboard' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'messages',      label: 'Messages' },
    { id: 'leads',         label: 'Leads (CRM)' },
    { id: 'pipeline',      label: 'Pipeline (Deals)' },
    { id: 'customers',     label: 'Customer DB' },
    { id: 'partners',      label: 'Partner DB' },
    { id: 'invoices',      label: 'Invoices' },
    { id: 'roadmap',       label: 'Roadmap' },
    { id: 'projects',      label: 'Fabrication' },
    { id: 'logistics',     label: 'Logistics' },
    { id: 'agents',        label: 'User Mgmt' },
    { id: 'calculator',    label: 'Calculator' },
    { id: 'admin',         label: 'Admin Panel' },
  ];

  const toggleAction = (role, module, action) => {
    setLocalPerms(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [module]: {
          ...(prev[role]?.[module] || { view: false, create: false, edit: false, delete: false, export: false }),
          [action]: !(prev[role]?.[module]?.[action] ?? false),
        },
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const finalPerms = { ...localPerms };
    if (permissions.Admin) finalPerms.Admin = permissions.Admin; // Admin locked to full
    await updatePermissions(finalPerms);
    setSaving(false);
  };

  const getModulePerms = (role, moduleId) => {
    return localPerms[role]?.[moduleId] || { view: false, create: false, edit: false, delete: false, export: false };
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <ShieldAlert className="text-primary" />
            Dynamic Role Permissions
          </h3>
          <p className="text-sm text-on-surface-variant mt-1">
            Configure granular access for each role. Admin is locked to full access.
          </p>
          {/* Legend */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {ACTION_DEFS.map(a => (
              <span key={a.key} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border ${a.color.on}`}>
                <span className="w-4 text-center">{a.label}</span>
                <span className="text-[9px] font-medium opacity-80">{a.title}</span>
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex-shrink-0 shadow-[0_0_15px_rgba(0,218,243,0.2)]"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Config'}
        </button>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto rounded-xl border border-outline-variant">
        <table className="w-full border-collapse text-left" style={{ minWidth: `${roles.length * 120 + 180}px` }}>
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="p-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider sticky left-0 bg-surface-container-low z-10 min-w-[180px]">
                Module / Feature
              </th>
              {roles.map(role => (
                <th key={role} className="p-3 text-xs font-bold text-on-surface uppercase tracking-tight text-center min-w-[110px]">
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map((mod, modIdx) => (
              <tr
                key={mod.id}
                className={`border-b border-outline-variant/30 ${modIdx % 2 === 0 ? '' : 'bg-surface-container/20'}`}
              >
                <td className="p-3 text-sm font-bold text-on-surface sticky left-0 bg-surface-container z-10 border-r border-outline-variant/30">
                  {mod.label}
                </td>
                {roles.map(role => {
                  const perms = getModulePerms(role, mod.id);
                  return (
                    <td key={role} className="p-2 text-center align-top">
                      <div className="flex flex-col gap-1">
                        {ACTION_DEFS.map(action => {
                          const isOn = perms[action.key] === true;
                          return (
                            <button
                              key={action.key}
                              onClick={() => toggleAction(role, mod.id, action.key)}
                              className={`w-full py-0.5 rounded text-[9px] font-bold border transition-all hover:scale-105 active:scale-95 ${
                                isOn ? action.color.on : action.color.off
                              }`}
                              title={`${role}: ${action.title} ${mod.label}`}
                            >
                              {action.label}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <p className="text-[10px] text-on-surface-variant mt-4 text-center">
        V = View &nbsp;·&nbsp; C = Create &nbsp;·&nbsp; E = Edit &nbsp;·&nbsp; D = Delete &nbsp;·&nbsp; X = Export &nbsp;·&nbsp; Click any cell to toggle. Changes apply on Save.
      </p>
    </Card>
  );
}
