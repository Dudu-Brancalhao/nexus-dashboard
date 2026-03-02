import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import { Mail } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.email('Endereço de email inválido'),
  password: z.string().nonempty('Preencha a senha'),
})

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = () => {
    navigate('/admin/dashboard')
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label='E-mail'
        type='email'
        placeholder='Insira seu e-mail'
        icon={<Mail size={18} />}
        error={errors.email}
        {...register('email')}
      />
      <PasswordInput
        label='Senha'
        placeholder='Senha'
        {...register('password')}
        error={errors.password}
      />
      <div className='flex justify-between mb-8'>
        <div className='flex items-center gap-2'>
          <input type='checkbox' className="w-4 h-4 accent-[var(--color-accent)]" />
          <span className="whitespace-nowrap">Lembrar credenciais</span>
        </div>
        <div className='text-gray-400 cursor-pointer hover:underline whitespace-nowrap'>Esqueceu a senha?</div>
      </div>
      <Button type="submit" variant="primary" className="w-full mb-6">
        Login
      </Button>
      <div className="flex justify-between items-center gap-2 mb-6">
        <div className="flex-1 h-[1px] bg-gray-500"></div>
        <span className="text-gray-500 whitespace-nowrap"> ou continue com</span>
        <div className="flex-1 h-[1px] bg-gray-500"></div>
      </div>
      <Button variant="ghost" className="w-full mb-8">
        <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#4285F4"></path>
          <path d="M6.3 14.7l7 5.1C15.1 16.3 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2c-7.6 0-14.2 4.3-17.7 10.7z" fill="#EA4335"></path>
          <path d="M24 46c5.5 0 10.5-1.9 14.4-5.1l-6.7-5.5C29.7 37 27 38 24 38c-6 0-10.7-4-12.3-9.5l-7 5.4C8 41.5 15.3 46 24 46z" fill="#34A853"></path>
          <path d="M44.5 20H24v8.5h11.8c-1.1 3-3.3 5.4-6.1 7l6.7 5.5C41 37.6 45 31.5 45 24c0-1.3-.2-2.7-.5-4z" fill="#FBBC05"></path>
        </svg>
        Entrar com Google
      </Button>
      <div className='flex justify-center gap-2 cursor-default'>
        <span className="text-gray-400">Não tem uma conta?</span>
        <div className='text-[var(--color-accent)] cursor-pointer hover:underline'>Solicitar acesso</div>
      </div>
    </form>
  )
}