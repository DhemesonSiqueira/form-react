import { Button, Input, Radio, Select, Switch } from "@/components";
import useFormGroup from "./useForm";

import {
  formatCEP,
  formatCPF,
  formatCurrencyBRL,
  formatDate,
  formatPhone,
  parseCEP,
} from "@/utils/masks";
import { validateCEP } from "@/utils/validateCEP";

const Form = () => {
  const {
    register,
    handleSubmit,
    errors,
    handleSubmitForm,
    handleShowPassword,
    showPassword,
    Controller,
    control,
    handleSearchAddressByZipCode,
    handleSearchCitiesByState,
    addressData,
    citiesData,
  } = useFormGroup();

  const listOfStates = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const listCities = (citiesData && citiesData.map((city) => city.nome)) || [];

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="bg-white w-11/12 max-w-3xl py-8 flex items-center flex-col gap-6"
    >
      <Input
        type="text"
        placeholder="Nome completo"
        label="Nome completo"
        helperText={errors.fullName?.message}
        {...register("fullName")}
      />

      <Input
        type="text"
        placeholder="000.000.000-00"
        label="CPF"
        maxLength={14}
        helperText={errors.documentNumber?.message}
        {...register("documentNumber", { maxLength: 14 })}
        onChange={(e) => {
          const { value } = e.target;

          e.target.value = formatCPF(value);
        }}
      />

      <Input
        type="text"
        placeholder="dd/mm/aaaa"
        label="addressData de nascimento"
        maxLength={10}
        helperText={errors.birthdate?.message}
        {...register("birthdate")}
        onChange={(e) => {
          const { value } = e.target;

          e.target.value = formatDate(value);
        }}
      />

      <Input
        type="email"
        placeholder="Informe seu e-mail"
        label="E-mail"
        helperText={errors.email?.message}
        {...register("email")}
      />

      <Input
        type="tel"
        placeholder="(99) 99999-9999"
        label="Contato"
        maxLength={15}
        helperText={errors.phoneNumber?.message}
        {...register("phoneNumber")}
        onChange={(e) => {
          const { value } = e.target;

          e.target.value = formatPhone(value);
        }}
      />

      <Input
        type="text"
        placeholder="Informe o seu CEP"
        label="CEP"
        maxLength={10}
        helperText={errors.zipcode?.message}
        {...register("zipcode")}
        onChange={(e) => {
          const { value } = e.target;

          e.target.value = formatCEP(value);
        }}
        onBlurCapture={(e) => {
          const { value } = e.target;

          const zipcode = parseCEP(value);
          const isValidCEP = validateCEP(zipcode);

          if (!isValidCEP) {
            return;
          }

          handleSearchAddressByZipCode(zipcode);
        }}
      />

      <Input
        type="text"
        placeholder="Ex: Brasil"
        label="País"
        helperText={errors.country?.message}
        {...register("country")}
        defaultValue={addressData?.pais}
      />

      <Controller
        render={({ field }) => (
          <Select
            field={field}
            placeholder={addressData?.uf || "Selecione o seu estado"}
            label="Estado"
            helperText={errors.addressState?.message}
            listOptions={listOfStates}
            handleOnChange={(e) => {
              const UF = e.target.innerText;

              handleSearchCitiesByState(UF);
            }}
          />
        )}
        name="addressState"
        control={control}
        defaultValue=""
      />

      <Controller
        render={({ field }) => (
          <Select
            field={field}
            placeholder={addressData?.localidade || "Selecione a sua cidade"}
            label="Cidade"
            helperText={errors.city?.message}
            listOptions={listCities}
          />
        )}
        name="city"
        control={control}
        defaultValue=""
      />

      <Input
        type="text"
        placeholder="Informe seu endereço"
        label="Endereço"
        helperText={errors.street?.message}
        {...register("street")}
        defaultValue={addressData?.logradouro}
      />

      <Input
        type="text"
        placeholder="Informe o número de endereço"
        label="Número"
        helperText={errors.addressNumber?.message}
        {...register("addressNumber")}
      />

      <Input
        type="text"
        placeholder="Informe o seu bairro"
        label="Bairro"
        helperText={errors.district?.message}
        {...register("district")}
        defaultValue={addressData?.bairro}
      />

      <Input
        type="text"
        placeholder="Opcional"
        label="Complemento"
        helperText={errors.addressComplement?.message}
        {...register("addressComplement")}
        defaultValue={addressData?.complemento}
      />

      <div className="w-11/12 max-w-xl flex flex-col text-sm text-slate-500">
        <span> Escolaridade </span>
        <div className="p-5" aria-required>
          <Radio
            type="radio"
            value="Ensino Fundamental Completo"
            {...register("educationLevel")}
          />
          <Radio
            type="radio"
            value="Ensino Médio Completo"
            {...register("educationLevel")}
          />
          <Radio
            type="radio"
            value="Ensino Superior Completo"
            {...register("educationLevel")}
          />
        </div>

        {errors.educationLevel && (
          <span className="text-red-500 text-xs">
            <hr className="border border-red-500" />
            Selecione a sua escolaridade
          </span>
        )}
      </div>

      <Input
        type="text"
        placeholder="Ex: R$ 3.000,00"
        label="Renda mensal"
        helperText={errors.minimumWage?.message}
        {...register("minimumWage")}
        onChange={(event) =>
          (event.target.value = formatCurrencyBRL(event.target.value))
        }
      />

      <Input
        placeholder="Senha"
        type={showPassword ? "text" : "password"}
        label="Senha"
        helperText={errors.password?.message}
        {...register("password")}
      />

      <Input
        placeholder="Confirmar senha"
        type={showPassword ? "text" : "password"}
        label="Confirmar senha"
        helperText={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <div className="w-11/12 max-w-xl flex items-center">
        <Switch onClick={handleShowPassword} className="bg-violet-500" />
        <span className="ml-4 text-base text-zinc-500"> Ver senhas </span>
      </div>

      <Button>Cadastrar</Button>
    </form>
  );
};

export default Form;
