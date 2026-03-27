import { useMutation } from '@tanstack/react-query';
import { authService } from '../services';
import { useAuthStore } from '../store';

export const useLogin = () => {
  const {setSession} = useAuthStore();

  return useMutation({
    mutationFn: authService.login,
    meta: {
      successMessage: 'Login realizado com sucesso!'
    },
    onSuccess: (session) => {
      setSession(session);
    }
  });
};

export const UseAuthorizeSSO = ()=>{
  const {setSession} = useAuthStore();
  
  return useMutation({
    mutationFn: authService.authorizeSSO,
    meta:{
      successMessage: 'Login realizado com sucesso!'
    },
    onSuccess: (session)=>{
      setSession(session)
    }
  })
}

export const useLogout = ()=>{
  const {logout} =  useAuthStore()

  return useMutation({
    mutationFn: authService.logout,
    meta: {
      successMessage: 'Logout realizado com sucesso'
    },
    onSuccess: ()=>{
      logout()
    }
  })
}