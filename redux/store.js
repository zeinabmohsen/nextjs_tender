import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import combinedReducers from "./reducer/rootReducer"; 

// Define Redux persist configuration
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["UserData"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const configureStore = (preloadedState) => {
    const composeEnhancers =
        process.env.NODE_ENV === "development" && typeof window !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
            : compose;

    const middleware = [thunk];

    const store = createStore(
        persistedReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(...middleware))
    );

    const persistor = persistStore(store);

    return { store, persistor };
};

export default configureStore;
