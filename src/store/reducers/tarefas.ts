import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Tarefa'
import * as enums from '../../utils/enums/tarefa'

type TarefasState = {
  itens: Tarefa[]
}

const initialState: TarefasState = {
  itens: [
    {
      id: 1,
      descricao: 'revisar JavaScript',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.CONCLUIDA,
      titulo: 'Estudar JavaScript'
    },
    {
      id: 2,
      descricao: 'Ler material de apoio',
      prioridade: enums.Prioridade.URGENTE,
      status: enums.Status.PENDENTE,
      titulo: 'Ler material'
    },
    {
      id: 3,
      descricao: 'praticar construção de uma landpage',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.PENDENTE,
      titulo: 'Praticar'
    }
  ]
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((tarefa) => tarefa.id !== action.payload)
      ]
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexTarefa >= 0) {
        state.itens[indexTarefa] = action.payload
      }
      // tarefaEdit = action.payload
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaExiste = state.itens.find(
        (tarefa) => tarefa.titulo.toLowerCase() === action.payload.titulo
      )

      if (tarefaExiste) {
        alert('Existe uma tarefa com este nome')
      } else {
        // pega o ultimo item do array
        const lastTarefa = state.itens[state.itens.length - 1]
        const newTarefa = {
          ...action.payload,
          id: lastTarefa ? lastTarefa.id + 1 : 1
        }
        state.itens.push(newTarefa)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexTarefa >= 0) {
        state.itens[indexTarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

export const { cadastrar, remover, editar, alteraStatus } = tarefasSlice.actions

export default tarefasSlice.reducer
