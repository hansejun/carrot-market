import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import { Product, Sale } from "@prisma/client";

interface ProductAddCount extends Product {
  _count: {
    fav: number;
  };
}

interface SaleWithProduct extends Sale {
  product: ProductAddCount;
}

interface SoldResponse {
  ok: boolean;
  records: SaleWithProduct[];
}

const Sold: NextPage = () => {
  const { data } = useSWR<SoldResponse>("/api/users/me/sales");
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        {data?.records?.map((record, i) => (
          <Item
            id={record?.product?.id}
            key={record?.id}
            title={record?.product?.name}
            price={record?.product?.price}
            comments={0}
            hearts={record?.product?._count?.fav}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Sold;
