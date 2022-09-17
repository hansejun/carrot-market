import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import { Product, Purchase } from "@prisma/client";
import useSWR from "swr";

interface ProductAddCount extends Product {
  _count: {
    fav: number;
  };
}

interface PurchaseWithProduct extends Purchase {
  product: ProductAddCount;
}

interface PurchaseResponse {
  ok: boolean;
  records: PurchaseWithProduct[];
}
const Bought: NextPage = () => {
  const { data } = useSWR<PurchaseResponse>("/api/users/me/purchases");
  return (
    <Layout title="구매내역" canGoBack>
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

export default Bought;
