export default class ContractSupport {
  public static readonly CELL_PHONE_PARTNER: RegExp = /^(55){0,1}[1-9]{2}[9]?[2-9]{1}[0-9]{7}$/;

  public static readonly LANDLINE_PARTNER: RegExp = /^(55){0,1}[1-9]{2}[0-9]{8}$/;

  public static readonly EMAIL_PARTNER: RegExp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  public static readonly INTENGER_PARTNER: RegExp = /^[0-9]{1,}$/;

  public static readonly ZIP_CODE_PARTNER: RegExp = /^([\d]{5}-[\d]{3})|([\d]{8})$/;

  public static CnpjIsValid(cnpj: string): boolean {
    if (!ContractSupport.INTENGER_PARTNER.test(cnpj) || cnpj.length !== 14) { return false; }

    const multiplicador1: Array<number> = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const multiplicador2: Array<number> = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    let resto: number;
    let digito: string;
    let tempCnpj: string = cnpj.substring(0, 12);

    for (let i = 0; i < 12; i += 1) {
      soma += Number(tempCnpj[i]) * multiplicador1[i];
    }

    resto = (soma % 11);

    if (resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    digito = resto.toString();
    tempCnpj += digito;
    soma = 0;

    for (let i = 0; i < 13; i += 1) {
      soma += Number(tempCnpj[i]) * multiplicador2[i];
    }

    resto = (soma % 11);

    if (resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    digito += resto.toString();

    return cnpj.endsWith(digito);
  }

  public static CpfIsValid(cpf: string): boolean {
    if (!ContractSupport.INTENGER_PARTNER.test(cpf) || cpf.length !== 11) { return false; }

    const multiplicador1: Array<number> = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const multiplicador2: Array<number> = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    let tempCpf: string = cpf.substring(0, 9);
    let digito: string;
    let soma = 0;
    let resto: number;

    for (let i = 0; i < 9; i += 1) {
      soma += Number(tempCpf[i]) * multiplicador1[i];
    }

    resto = soma % 11;

    if (resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    digito = resto.toString();
    tempCpf += digito;
    soma = 0;

    for (let i = 0; i < 10; i += 1) {
      soma += Number(tempCpf[i]) * multiplicador2[i];
    }

    resto = soma % 11;

    if (resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    digito += resto.toString();

    return cpf.endsWith(digito);
  }
}
