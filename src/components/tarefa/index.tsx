import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'
import { Botao, SaveButton } from '../../styles'
import * as enums from '../../utils/enums/tarefa'

type Props = TarefaClass

const Tarefa = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  titulo,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) setDescricao(descricaoOriginal)
  }, [descricaoOriginal])

  function cancellEdit() {
    setIsEditing(false)
    setDescricao(descricaoOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    console.log(evento.target.checked)
    dispatch(
      alteraStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo>
          {isEditing && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao
        disabled={!isEditing}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
      <S.BarraAcoes>
        {isEditing ? (
          <>
            <SaveButton
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    prioridade,
                    status,
                    titulo,
                    id
                  })
                )
                setIsEditing(false)
              }}
            >
              Salvar
            </SaveButton>
            <S.CancelButton onClick={cancellEdit}>Cancelar</S.CancelButton>
          </>
        ) : (
          <>
            <Botao onClick={() => setIsEditing(true)}>Editar</Botao>
            <S.CancelButton onClick={() => dispatch(remover(id))}>
              Remover
            </S.CancelButton>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa
