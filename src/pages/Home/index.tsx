import BotaoAdd from '../../components/BotaoAdd'
import BarraLateral from '../../containers/barra-lateral'
import ListaTarefas from '../../containers/listaDeTarefas'

const Home = () => (
  <>
    <BarraLateral showFilter />
    <ListaTarefas />
    <BotaoAdd />
  </>
)

export default Home
