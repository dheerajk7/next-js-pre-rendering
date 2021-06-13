import styles from '../styles/Home.module.css'
import Link from 'next/link';
import path from 'path';
import fs from 'fs/promises';

export default function Home(props: any) {
  console.log(props);
  const { products } = props;
  return (
    <div className={styles.container}>
      <ul>
        {products.map((product) => <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>)}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  // We can perform API call here to get the product list.
  // We can use file operation as well here but we can't use them in normal react function because those will be running on client browser.
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
    // revalidate will regenerate this static page when this time lapse to update product list.
    // this is called incremental static generation.
    revalidate: 10,
  }
}
