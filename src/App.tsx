import './styles/index.scss';
import Button from './components/button/button';

export default function App() {
  return (
    <div>
      <Button onClick={() => alert('hello')}>hello default</Button>
      <Button onClick={() => alert('hello')} disabled>
        hello default
      </Button>
      <Button btnType="primary" size="sm">
        hello default
      </Button>
      <Button btnType="danger" size="lg" disabled={true}>
        禁用按钮
      </Button>
      <Button btnType="link" href="https://baidu.com" size="sm" target="_blank">
        链接
      </Button>
      <Button btnType="link" href="https://baidu.com" size="sm" disabled>
        链接
      </Button>
    </div>
  );
}
