import AuthenticatedLayout from "@/app/components/AuthenticatedLayout";
import AddNewCustomer from "../components/AddNewCustomer";

export default function NewOrder() {
  return (
      <AuthenticatedLayout>
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="font-semibold text-3xl text-lightpurple">new order</h1>
          </div>
          <AddNewCustomer />
          {/* <NewOrderSearch /> */}
        </div>
      </AuthenticatedLayout>
  );
}
