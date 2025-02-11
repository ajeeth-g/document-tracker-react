import Breadcrumb from '../../component/breadcrumb/Breadcrumb';

const Settings = () => {
  const breadcrumbLinks = [
    { label: "Home", to: "/" },
    { label: "Settings" },
  ];


  return (
    <div>
      <Breadcrumb links={breadcrumbLinks} />
      <h1 className="text-2xl font-bold">Settings Page</h1>
      <p>Manage your settings here.</p>
    </div>
  )
}

export default Settings