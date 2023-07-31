import { Payment, usePaymentDetailQuery } from "@/graphql/graphql";

import { useRouter } from "next/router";

function Payment({ payment }: { payment?: Payment | null }) {
	return (
		<div>
			<div className="px-4 sm:px-0">
				<h3 className="text-base font-semibold leading-7 text-gray-900">
					Payment Information
				</h3>
				<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
					Payment details
				</p>
			</div>
			<div className="mt-6 border-t border-gray-100">
				<dl className="divide-y divide-gray-100">
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">ID</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{payment?.id}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Order ID
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{payment?.order?.id}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Total
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{payment?.total?.amount} EURO
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Status
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{payment?.chargeStatus}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Payment Method Type
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{payment?.paymentMethodType}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Gateway
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{payment?.gateway}
						</dd>
					</div>
					{/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							About
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
							incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
							consequat sint. Sit id mollit nulla mollit nostrud in ea officia
							proident. Irure nostrud pariatur mollit ad adipisicing
							reprehenderit deserunt qui eu.
						</dd>
					</div> */}
					{/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Attachments
						</dt>
						<dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<ul
								role="list"
								className="divide-y divide-gray-100 rounded-md border border-gray-200"
							>
								<li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
									<div className="flex w-0 flex-1 items-center">
										<PaperClipIcon
											className="h-5 w-5 flex-shrink-0 text-gray-400"
											aria-hidden="true"
										/>
										<div className="ml-4 flex min-w-0 flex-1 gap-2">
											<span className="truncate font-medium">
												resume_back_end_developer.pdf
											</span>
											<span className="flex-shrink-0 text-gray-400">2.4mb</span>
										</div>
									</div>
									<div className="ml-4 flex-shrink-0">
										<a
											href="#"
											className="font-medium text-indigo-600 hover:text-indigo-500"
										>
											Download
										</a>
									</div>
								</li>
								<li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
									<div className="flex w-0 flex-1 items-center">
										<PaperClipIcon
											className="h-5 w-5 flex-shrink-0 text-gray-400"
											aria-hidden="true"
										/>
										<div className="ml-4 flex min-w-0 flex-1 gap-2">
											<span className="truncate font-medium">
												coverletter_back_end_developer.pdf
											</span>
											<span className="flex-shrink-0 text-gray-400">4.5mb</span>
										</div>
									</div>
									<div className="ml-4 flex-shrink-0">
										<a
											href="#"
											className="font-medium text-indigo-600 hover:text-indigo-500"
										>
											Download
										</a>
									</div>
								</li>
							</ul>
						</dd>
					</div> */}
				</dl>
			</div>
		</div>
	);
}

const PaymentDetail = () => {
	const router = useRouter();
	const paymentId = router.query.id;

	const [{ data, fetching, error }] = usePaymentDetailQuery({
		variables: {
			id: paymentId as string,
		},
	});

	const payment = data?.payment as Payment;

	console.log({ payment });

	return (
		<div className="p-5">
			<Payment payment={payment} />
		</div>
	);
};

export default PaymentDetail;
