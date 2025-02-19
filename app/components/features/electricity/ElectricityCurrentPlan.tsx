import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState } from "react";

const providerProducts = [
  {
    name: "alexela",
    provider: "Alexela",
    products: [
      {
        name: "test",
        product: "Test",
      },
    ],
  },
  {
    name: "baltcom",
    provider: "Baltcom",
    products: [
      {
        name: "test",
        product: "Test",
      },
    ],
  },
  {
    name: "elenger",
    provider: "Elenger",
    products: [
      {
        name: "test",
        product: "Test",
      },
    ],
  },
  {
    name: "enefit",
    provider: "Enefit",
    products: [
      {
        name: "test",
        product: "Test",
      },
    ],
  },
  {
    name: "elektrum",
    provider: "Elektrum",
    products: [
      {
        name: "test",
        product: "Test",
      },
    ],
  },
  {
    name: "elementary",
    provider: "Elementary",
    products: [
      {
        name: "test",
        product: "Test",
      },
    ],
  },
  {
    name: "tet",
    provider: "Tet",
    products: [
      {
        name: "test",
        product: "Test",
      },
    ],
  },
  {
    name: "virsi",
    provider: "Virsi",
    products: [
      {
        name: "test",
        product: "Test",
      },
    ],
  },
];

const getProviders = () => {
  return providerProducts;
};

const getProducts = (provider?: string) => {
  return providerProducts.find((p) => p.name === provider)?.products;
};

export default function ElectricityCurrentPlan() {
  const [provider, setProvider] = useState<string>();
  const [product, setProduct] = useState<string>();
  return (
    <form className="text-sm">
      <fieldset className="flex flex-col gap-4 rounded-lg border p-4 h-full">
        <legend className="-ml-1 px-1 font-medium">
          Current Electricity Plan
        </legend>
        <div className="text-muted-foreground">
          Specify current electricity tariff by entering it manually, selecting
          a provider product, or just entering a lump sum amount.
        </div>
        <Tabs defaultValue="manual">
          <TabsList className="grid w-full grid-cols-3 h-8">
            <TabsTrigger value="manual" className="text-xs">
              Manual
            </TabsTrigger>
            <TabsTrigger value="provider" className="text-xs">
              Provider
            </TabsTrigger>
            <TabsTrigger value="lumpSum" className="text-xs">
              Lump Sum
            </TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <div className="my-4">
              Manually enter electricity tariff, monthly fixed price if
              applicable and other fees if applicable.
            </div>
            <div className="grid grid-cols-7 items-center gap-2">
              <Label htmlFor="vatIncluded" className="col-span-4">
                VAT Included
              </Label>
              <Switch id="vatIncluded" checked={true} className="col-span-3" />
              <Label htmlFor="tariff" className="col-span-4">
                Tariff
              </Label>
              <Input id="tariff" className="col-span-2" />
              <span className="text-xs">€/kWh</span>
              <Label htmlFor="monthlyFee" className="col-span-4">
                Monthly Fee
              </Label>
              <Input id="monthlyFee" className="col-span-2" />
              <span className="text-xs">€</span>
              <Label htmlFor="productChangeFee" className="col-span-4">
                Product Change Fee
              </Label>
              <Input id="productChangeFee" className="col-span-2" />
              <span className="text-xs">€</span>
              <Label htmlFor="terminationFee" className="col-span-4">
                Termination Fee
              </Label>
              <Input id="terminationFee" className="col-span-2" />
              <span className="text-xs">€</span>
            </div>
          </TabsContent>
          <TabsContent value="provider">
            <div className="my-4">
              Select provider and product to automatically calculate tariff.
            </div>
            <div className="grid grid-cols-7 items-center gap-2">
              <Label htmlFor="provider" className="col-span-2">
                Provider
              </Label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger id="provider" className="col-span-5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getProviders().map((p, i) => (
                    <SelectItem key={i} value={p.name}>
                      {p.provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label htmlFor="product" className="col-span-2">
                Product
              </Label>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger id="product" className="col-span-5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getProducts(provider)?.map((p, i) => (
                    <SelectItem key={i} value={p.name}>
                      {p.product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          <TabsContent value="lumpSum">
            <div className="my-4">
              Just enter your monthly electricity bill amount. This will
              override price for connection.
            </div>
            <div className="grid grid-cols-7 items-center gap-2">
              <Label htmlFor="vatIncluded" className="col-span-4">
                VAT Included
              </Label>
              <Switch id="vatIncluded" checked={true} className="col-span-3" />
              <Label htmlFor="monthlyPrice" className="col-span-4">
                Monthly Price
              </Label>
              <Input id="monthlyPrice" className="col-span-2" />
              <span className="text-xs">€</span>
            </div>
          </TabsContent>
        </Tabs>
      </fieldset>
    </form>
  );
}
