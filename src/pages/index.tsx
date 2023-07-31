import { Payment, usePaymentsQuery } from "@/graphql/graphql";
import { gql } from "graphql-tag";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const people = [
	{
		name: "Lindsay Walton",
		title: "Front-end Developer",
		email: "lindsay.walton@example.com",
		role: "Member",
	},
	// More people...
];

function Payments({ payments }: { payments: Payment[] }) {
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">
						Payments
					</h1>
					<p className="mt-2 text-sm text-gray-700">
						A list of all the payments in your shop including their orderId
					</p>
				</div>
				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
					{/* <button
						type="button"
						className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Add user
					</button> */}
				</div>
			</div>
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
									>
										ID
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										OrderId
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Amount
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Status
									</th>
									{/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
										<span className="sr-only">Edit</span>
									</th> */}
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{payments.map((payment) => (
									<tr key={payment.id}>
										<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
											<Link href={`/payments/${payment.id}`}>{payment.id}</Link>
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{payment.order?.id}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{payment.total?.amount}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{payment.chargeStatus}
										</td>
										{/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
											<a
												href="#"
												className="text-indigo-600 hover:text-indigo-900"
											>
												Edit<span className="sr-only">, {payment.name}</span>
											</a>
										</td> */}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

gql`
	query Payments {
		payments(first: 10) {
			edges {
				node {
					id
					gateway
					created
					modified
					order {
						id
					}
					paymentMethodType
					chargeStatus
					total {
						amount
					}
					capturedAmount {
						amount
					}
					metafields
				}
			}
		}
	}
`;

const Page: NextPage = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isLocalHost = global.location.href.includes("localhost");

	const [{ data, fetching }] = usePaymentsQuery({});

	const payments = data?.payments?.edges.map((edge) => edge.node as Payment);

	console.log({ payments });

	return (
		<div className="py-5">
			<Payments payments={payments || []} />
		</div>
	);
};

export default Page;
