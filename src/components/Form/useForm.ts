import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { cepService } from "@/services/cepService";
import { ibgeService } from "@/services/ibgeService";

import { parseCEP, parseCPF, parseCurrencyBRL, parseDate, parsePhone } from "@/utils/masks";
import { validateCEP } from "@/utils/validateCEP";

export const createUserFormSchema = z.object({
  fullName: z.string().nonempty('Nome é obrigatório').max(100, 'Nome deve conter no máximo 100 caracteres'),
  documentNumber: z.string().nonempty('CPF é obrigatório').min(11, 'Informe um CPF válido').transform((value) => parseCPF(value)),
  birthdate: z.string().nonempty('Data de nascimento é obrigatória').min(9, 'Informe uma data válida').transform((value) => parseDate(value).toString()).refine((value) => {
    const birthdate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();

    if (age > 18
      || (age === 18 && today.getMonth() > birthdate.getMonth())
      || (age === 18 && today.getMonth() === birthdate.getMonth() && today.getDay() >= birthdate.getDay())
    ) {
      return true;
    } else {
      return false;
    }
  }, 'Você precisa ter 18 anos ou mais para se cadastrar'), // API CEP COM REACT QUERY
  email: z.string().nonempty('Email é obrigatório').email('Informe um e-mail válido'),
  phoneNumber: z.string().nonempty('Contato é obrigatório').min(11, 'Informe um contato válido').transform((value) => parsePhone(value)),
  zipcode: z.string().nonempty('CEP é obrigatório').transform((value) => parseCEP(value)),
  country: z.string().nonempty('País é obrigatório'),
  addressState: z.string().nonempty('Estado é obrigatório').max(2, 'Informe um estado válido'),
  city: z.string().nonempty('Cidade é obrigatória'),
  street: z.string().nonempty('Endereço é obrigatório'),
  addressNumber: z.string().nonempty('Número é obrigatório').max(40, 'Número deve conter no máximo 40 caracteres'),
  district: z.string().nonempty('Bairro é obrigatório'),
  addressComplement: z.string().optional(),
  educationLevel: z.string().nonempty('Escolaridade é obrigatória'),
  minimumWage: z.string().nonempty('Renda é obrigatória').transform((value) => parseCurrencyBRL(value)),
  password: z.string().nonempty('Senha é obrigatória').min(10, 'Senha deve conter no mínimo 10 caracteres'),
  confirmPassword: z.string().nonempty('Confirme sua senha'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas devem ser iguais',
  path: ['confirmPassword']
});

export type CreateUserForm = z.infer<typeof createUserFormSchema>;

const useFormGroup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [zipcode, setZipcode] = useState('');
  const [state, setState] = useState('');

  const isValidCEP = validateCEP(zipcode);

  const { data: addressData } = useQuery({
    queryKey: ['address', zipcode],
    queryFn: async () => {
      const res = await cepService.getAddressByZipCode(zipcode);

      setValue('addressState', res.uf);
      setValue('city', res.localidade);
      setValue('street', res.logradouro);
      setValue('district', res.bairro);
      setValue("country", res.pais);

      return res;
    },
    enabled: isValidCEP,
    refetchOnWindowFocus: false,
  });

  const { data: citiesData } = useQuery({
    queryKey: ['cities', state],
    queryFn: async () => {
      const res = await ibgeService.getCitiesByState(state);

      return res;
    },
    enabled: !!state,
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserFormSchema),
  });

  const handleSubmitForm = (data: CreateUserForm) => {
    console.log({ data });
  };

  const handleShowPassword = () => {
    showPassword
      ? setShowPassword(false)
      : setShowPassword(true);
  };

  const handleSearchAddressByZipCode = (CEP: string) => {
    setZipcode(CEP);
  }

  const handleSearchCitiesByState = (UF: string) => {
    setState(UF);
  }

  return {
    register,
    handleSubmit,
    errors,
    handleShowPassword,
    handleSubmitForm,
    showPassword,
    control,
    Controller,
    handleSearchAddressByZipCode,
    handleSearchCitiesByState,
    addressData,
    citiesData,
  }
}

export default useFormGroup;