import Breadcrumb from '../../component/breadcrumb/Breadcrumb';

const Dashboard = () => {

  const breadcrumbLinks = [
    { label: "Home", to: "/" },
    { label: "Dashboard" },
  ];

  return (
    <div>
      <Breadcrumb links={breadcrumbLinks} />
      <h1 className="text-2xl font-bold">Dashboard Page</h1>
      <p>Welcome to the Dashboard!</p>
    </div>
  )
}

export default Dashboard
