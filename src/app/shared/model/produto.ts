export class Produto {
  constructor(
  public id: number,
  public nome: string,
  public dataCompra: Date,
  public duracaoGarantiaMeses: number,
  public dataFimGarantia: string,
  )
  {}
}
