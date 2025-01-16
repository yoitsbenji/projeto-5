import styled from 'styled-components'
import variaveis from '../../styles/variaveis'

import * as enums from '../../utils/enums/tarefa'
import { Botao } from '../../styles'

type TagProps = {
  prioridade?: enums.Prioridade
  status?: enums.Status
  //propriedade que indica para qual dos dois olhar
  parametro: 'status' | 'prioridade'
}

function returnBgColor(props: TagProps): string {
  if (props.parametro == 'prioridade') {
    if (props.prioridade === enums.Prioridade.URGENTE) return variaveis.red
    if (props.prioridade === enums.Prioridade.IMPORTANTE)
      return variaveis.orange
  } else {
    if (props.status === enums.Status.PENDENTE) return variaveis.yellow
    if (props.status === enums.Status.CONCLUIDA) return variaveis.green
  }
  return '#ccc'
}

export const Card = styled.div`
  background-color: #fcfcfc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 16px;
  margin-bottom: 32px;
  border-radius: 16px;

  label {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
`

export const Titulo = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
`

export const Tag = styled.span<TagProps>`
  padding: 4px 8px;
  color: #fff;
  foont-weight: bold;
  font-size: 10px;
  background-color: ${(props) => returnBgColor(props)};
  border-radius: 8px;
  margin-right: 16px;
  display: inline-block;
`

export const Descricao = styled.textarea`
  color: #8b8b8b;
  font-size: 14px;
  line-height: 24px;
  font-family: 'Roboto Mono', monospace;
  display: block;
  width: 100%;
  margin-bottom: 16px;
  margin-top: 16px;
  resize: none;
  border: none;
  background-color: transparent;
`

export const BarraAcoes = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 16px;
`

export const CancelButton = styled(Botao)`
  background-color: ${variaveis.red};
`
