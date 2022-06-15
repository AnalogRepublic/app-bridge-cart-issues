import { useAppBridge } from "@shopify/app-bridge-react";
import { Cart, Group } from "@shopify/app-bridge/actions";
import { useEffect, useState } from "react";

export default function CartModule() {
  const app = useAppBridge();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!app) {
      return null;
    }

    app.featuresAvailable(Group.Cart).then(function (state) {
      var _ref = state.Cart && state.Cart[Cart.Action.FETCH],
        Dispatch = _ref.Dispatch;

      if (Dispatch) {
        setMessage(
          JSON.stringify(
            {
              message: "Cart is available",
              cart: state.Cart[Cart.Action.FETCH],
            },
            undefined,
            2
          )
        );
      } else {
        setMessage(
          JSON.stringify({
            message: "Cart is not available",
            cart: state.Cart[Cart.Action.FETCH],
          })
        );
      }
    });
  }, [app]);

  return (
    <div>
      <pre>{message}</pre>
    </div>
  );
}
