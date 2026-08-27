import Header from '../components/layout/Header';

export default function NotFoundPage() {
  return <><Header compact/><main className="not-found"><span>404</span><h1>这里还没有产品。</h1><a className="button primary" href="#/">返回作品集</a></main></>;
}
