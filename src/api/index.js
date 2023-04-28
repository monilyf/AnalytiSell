import client, {METHODS} from './client';

export const api = {
    auth: {
        register : (params) => client({
            url:'/auth/local/register',
            data: params,
            method:METHODS.POST
        }) ,
        login : (params) => client({
            url:'/auth/local',
            data: params,
            method:METHODS.POST
        }) 
    },
    user:{
        getInfoById: (params) => client({
            url:'/users/me',
            data: params,
            method:METHODS.GET
        })
    }
}