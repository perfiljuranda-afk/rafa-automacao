/**
 * Versao de quem nao tem IA — origem da substituicao declarada em
 * `distribuicao.json`. Ver `gancho-da-ia.ts`.
 *
 * O webhook chama isto depois de responder a Meta. Aqui nao ha o que chamar:
 * nem o MEUCHAT nem o Radar sem IA levam a pasta `src/lib/ia`. Fica a funcao
 * com o mesmo nome e a mesma assinatura, para que o webhook seja byte a byte
 * igual nos quatro pacotes.
 */
export async function iaResponde(): Promise<void> {}
