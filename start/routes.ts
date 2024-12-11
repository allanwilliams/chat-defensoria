/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.get('/', async ({ view, auth }) => {
  return view.render('welcome', {
    user: auth.user
  })
}).middleware('auth')

Route.group(() => {
  Route.get('/login', 'FusionAuthController.authLogin');
  Route.get('/callback', 'FusionAuthController.callback');
  Route.get('/logout', 'FusionAuthController.logout');
}).prefix('auth')

Route.group(() => {
  Route.get('/getUser', 'UserController.getUser')
  Route.get('/listUsers', 'UserController.listUsers')
}).prefix('user').middleware('auth')

Route.get('*', async ({ view, auth }: HttpContextContract) => { 
  return view.render('index', {
    user: auth.user
  }) 
}).as('not_found').middleware('auth')