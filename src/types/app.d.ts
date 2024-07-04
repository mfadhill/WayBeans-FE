interface IUser {
    fullname: string;
    email: string;
    role: Role;
    photoProfile: string;
    cart: ICart[];
}

enum Role {
    Buyer = "Buyer",
    Seller = "Seller",
}

interface IProduct {
    id: string;
    name: string;
    stock: number;
    price: number;
    description: string;
    imageProduct: string;
    userId: string;
    createdAt: string;
}
interface ICart {
    id: string;
    userId: string;
    productId: string;
    total: number;
    totalPrice: number;
    product: IProduct;
}

interface ITransaction {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: number;
    possCode: number;
    address: string;
    status: Status;
    total: number;
    totalPrice: number;
    productTransactions: {
        product: IProduct
    };
}

enum Status {
    wait = "wait",
    approve = "approve",
    reject = "reject",
}
