import { useState } from "react";
import { FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-500 mb-1.5 tracking-wide uppercase">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <span className="absolute left-3.5 text-slate-400 z-10 pointer-events-none">
            <Icon size={16} />
          </span>
        )}
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-${isPassword ? "10" : "4"} py-3 rounded-xl border text-sm
            font-medium placeholder-slate-300 outline-none transition-all duration-200
            ${
              error
                ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-3 focus:ring-red-100"
                : "border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-100"
            }
          `}
          autoComplete={isPassword ? "off" : "on"}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-blue-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs font-medium"
          >
            <FiAlertCircle size={13} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputField;