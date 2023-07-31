"use client";

import { NoSSRWrapper } from "@/lib/no-ssr-wrapper";
import { GraphQLProvider } from "@/providers/GraphQLProvider";
import { AppBridge, AppBridgeProvider } from "@saleor/app-sdk/app-bridge";
import { RoutePropagator } from "@saleor/app-sdk/app-bridge/next";
import { PropsWithChildren } from "react";

const appBridgeInstance =
	typeof window !== "undefined" ? new AppBridge() : undefined;

export default function Layout({ children }: PropsWithChildren) {
	return (
		<NoSSRWrapper>
			<AppBridgeProvider appBridgeInstance={appBridgeInstance}>
				<GraphQLProvider>
					<RoutePropagator />
					{children}
				</GraphQLProvider>
			</AppBridgeProvider>
		</NoSSRWrapper>
	);
}
