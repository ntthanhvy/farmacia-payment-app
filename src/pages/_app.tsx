import "../styles/globals.css";

import { AppBridge, AppBridgeProvider } from "@saleor/app-sdk/app-bridge";
import { RoutePropagator } from "@saleor/app-sdk/app-bridge/next";
import React, { useEffect } from "react";
import { AppProps } from "next/app";

import { NoSSRWrapper } from "../lib/no-ssr-wrapper";
import { GraphQLProvider } from "../providers/GraphQLProvider";

/**
 * Ensure instance is a singleton.
 * TODO: This is React 18 issue, consider hiding this workaround inside app-sdk
 */
const appBridgeInstance =
	typeof window !== "undefined" ? new AppBridge() : undefined;

function NextApp({ Component, pageProps }: AppProps) {
	return (
		<NoSSRWrapper>
			<AppBridgeProvider appBridgeInstance={appBridgeInstance}>
				<GraphQLProvider>
					<RoutePropagator />
					<Component {...pageProps} />
				</GraphQLProvider>
			</AppBridgeProvider>
		</NoSSRWrapper>
	);
}

export default NextApp;
