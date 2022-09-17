import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import { Fav, Product } from "@prisma/client";
import useSWR from "swr";

interface FavAddCount extends Product {
  _count: {
    fav: number;
  };
}

interface FavWithProduct extends Fav {
  product: FavAddCount;
}

interface FavResponse {
  ok: boolean;
  records: FavWithProduct[];
}

const Loved: NextPage = () => {
  const { data } = useSWR<FavResponse>("/api/users/me/favs");
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

export default Loved;
