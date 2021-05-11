/**
 * Definição de tipo para configurações adicionais da estrutura de dados que será armazenada.
 */
export interface ICacheOptions {
  /**
   * Attributo opcional que indica em minutos a validade do cache.
   * Para cache permanente basta informar -1.
   * @default 60 minutos
   */
  expireIn?: number
}

/**
 * Definição do tipo para construção de adaptadores de cache.
 */
export interface ICache {
  /**
   * Método destinado à registrar estruturas de dados no cache.
   * @template T Tipo do parâmetro ´data´ que é definido em ´T´.
   * @param key Identificação única do cache dentro do ´context´ informado.
   * @param context Nome do contexto que o ´data´ pertence.
   * @param data Estrutura de dados que será persistida no cache.
   * @param options Parâmetro opcional contendo configurações adicionais para o
   * armazenamento do cache.
   * @returns Retorna uma ´Promise´ com true para sucesso e false para falha.
   */
  register<T>(key: string, context: string, data: T, options?: ICacheOptions): Promise<boolean>
  /**
   * Método destinado à apagar estruturas de dados do cache.
   * @param key Identificação única do cache dentro do ´context´ informado.
   * @param context Nome do contexto da estrura de dados que será apagada.
   * @returns Retorna uma ´Promise´ com true para sucesso e false para falha.
   */
  delete(key: string, context: string): Promise<boolean>;
  /**
   * Método destinado à obter estruturas de dados do cache.
   * @template T Tipo do parâmetro ´data´ que é definido em ´T´.
   * @param key Identificação única do cache dentro do ´context´ informado.
   * @param context Nome do contexto da estrura de dados que será obtida.
   * @returns Retorna uma ´Promise´ com o estrutura de dados encontrada.
   * Caso o dado não seja encontrado o retorno e ´null´.
   */
  obtain<T>(key: string, context: string): Promise<T>;
}
