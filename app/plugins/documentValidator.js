export function checkCpf(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9, 10].forEach(function (j) {
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
            soma += parseInt(e) * ((j + 2) - (i + 1));
        });
        r = soma % 11;
        r = (r < 2) ? 0 : 11 - r;
        if (r != cpf.substring(j, j + 1)) result = false;
    });
    return result;
}


export function cnpjValidation(cnpj) {
    if (!cnpj) return false
  
    const isString = typeof cnpj === 'string'
    const validTypes = isString || Number.isInteger(cnpj) || Array.isArray(cnpj)
  
    if (!validTypes) return false
  
    if (isString) {
      if (cnpj.length > 18) return false
  
      const digitsOnly = /^\d{14}$/.test(cnpj)
      const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(cnpj)
  
      if (digitsOnly || validFormat) true
      else return false
    }
  
    const match = cnpj.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []
  
    if (numbers.length !== 14) return false
    
    const items = [...new Set(numbers)]
    if (items.length === 1) return false
  
    const calc = (x) => {
      const slice = numbers.slice(0, x)
      let factor = x - 7
      let sum = 0
  
      for (let i = x; i >= 1; i--) {
        const n = slice[x - i]
        sum += n * factor--
        if (factor < 2) factor = 9
      }
  
      const result = 11 - (sum % 11)
  
      return result > 9 ? 0 : result
    }
  
    const digits = numbers.slice(12)
    
    const digit0 = calc(12)
    if (digit0 !== digits[0]) return false
  
    const digit1 = calc(13)
    return digit1 === digits[1]
  }




export default {
    checkCpf,
    cnpjValidation
}