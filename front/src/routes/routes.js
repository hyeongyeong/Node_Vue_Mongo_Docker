import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Category from 'src/pages/Category.vue'
import Suggestion from 'src/pages/Suggestion.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import Notifications from 'src/pages/Notifications.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/categories'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/categories',
    children: [
      {
        path: 'categories',
        name: 'Category',
        component: Category
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'suggestion',
        name: 'Suggestions to developers',
        component: Suggestion
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
