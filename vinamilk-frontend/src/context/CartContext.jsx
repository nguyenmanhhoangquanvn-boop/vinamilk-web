import { createContext, useContext, useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const totalItems = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);

  const updateQuantity = useCallback((id, qty) => {
    setItems((prev) => prev.map((item) => item._id === id ? { ...item, quantity: qty } : item));
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
    setSelected((prev) => prev.filter((s) => s !== id));
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng", { id: "cart-remove" });
  }, []);

  const toggleSelect = useCallback((id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelected((prev) => prev.length === items.length ? [] : items.map((i) => i._id));
  }, [items]);

  // packType: "le" | "vi" | "thuong", packInfo: { size, price, oldPrice } or null
  const addToCart = useCallback((product, qty = 1, packType = "le", packInfo = null) => {
    const cartKey = `${product._id}_${packType}`;

    setItems((prev) => {
      const existing = prev.find((i) => i._id === cartKey || (i.productId === product._id && i.packType === packType));
      if (existing) {
        toast.success("Đã cập nhật số lượng trong giỏ hàng!", { id: "cart-update" });
        return prev.map((i) =>
          (i.productId === product._id && i.packType === packType)
            ? { ...i, quantity: Math.min(i.quantity + qty, i.stock) }
            : i
        );
      }
      toast.success("Đã thêm vào giỏ hàng!", { id: "cart-add" });
      const packLabelMap = { le: "Lẻ", vi: "Vỉ", thuong: "Thùng" };
      const packLabelPrefix = packLabelMap[packType] || "Lẻ";
      const packLabel = packInfo ? `${packLabelPrefix} ${packInfo.size}` : "Lẻ";

      const newItem = {
        _id: `c${Date.now()}`,
        productId: product._id,
        name: product.name,
        price: packInfo ? packInfo.price : product.price,
        oldPrice: packInfo ? packInfo.oldPrice : product.oldPrice,
        discount: product.discount,
        image: product.image,
        emoji: product.emoji,
        category: product.category,
        quantity: qty,
        stock: product.stock || 99,
        packType: packType,
        packLabel: packLabel,
        packSize: packInfo ? packInfo.size : null,
      };
      setSelected((s) => [...s, newItem._id]);
      return [...prev, newItem];
    });
  }, []);

  const clearCart = useCallback(() => { setItems([]); setSelected([]); }, []);

  const value = useMemo(() => ({
    items, selected, totalItems, loading, updateQuantity, removeItem, toggleSelect, toggleSelectAll, addToCart, clearCart
  }), [items, selected, totalItems, loading, updateQuantity, removeItem, toggleSelect, toggleSelectAll, addToCart, clearCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};

export default CartContext;