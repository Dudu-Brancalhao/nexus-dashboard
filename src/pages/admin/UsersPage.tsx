import { AdminMenu } from '../../components/layout/SidebarTemplates';
import { Layout } from '../../components/layout';
import ProfilePicture from '../../assets/professional-photo-square.png'
import UsersTable from '../../components/tables/AdminUsersTable';

function AdminUsers() {
  return (
    <Layout menuItems={AdminMenu}>
      <div className="p-8 overflow-y-auto mb-16 md:mb-0">
        <div className="flex items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
              <span>Usuários</span>
            </h1>
            <p className="text-gray-400 mt-1">
              Gerencie todos os usuários
            </p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={ProfilePicture} className='rounded-full h-[40px]' />
            <span className="hidden md:flex text-white text-sm font-medium">Eduardo Brancalhão</span>
          </div>
        </div>

        <UsersTable/>

      </div>
    </Layout>
  )
}

export default AdminUsers;