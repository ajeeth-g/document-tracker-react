import Header from "../component/header/Header"
import Sidebar from "../component/sidebar/Sidebar"
import Footer from "../component/footer/Footer"

const MainLayout = ({children }) => {
  return (
    <div className="flex h-screen">
    <Sidebar />
    <div className="flex flex-col flex-grow">
      <Header />
      <main className="flex-grow p-4 bg-gray-100 rounded-xl">{children}</main>
      <Footer />
    </div>
  </div>
  )
}

export default MainLayout
