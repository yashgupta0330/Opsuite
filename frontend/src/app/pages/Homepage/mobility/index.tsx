import Image from "next/image";
import Link from "next/link";

const apps = [
	{
		title: "Customer App",
		desc: "Enable customers to register products, raise service requests, track status and provide feedback all from their mobile device. ",
		icon: "/mobility/customer.png",
		slug: "customer-app",
	},
	{
		title: "Field Engineer App ",
		desc: "Equip engineers with real-time job info, guided workflows and instant updates on the go. Works offline for low-connectivity areas.  ",
		icon: "/mobility/supervisor.png",
		slug: "field-technician-app",
	},
	{
		title: "Supervisor App ",
		desc: "Enable supervisors to assign tasks, track field performance and ensure timely service delivery with real-time visibility. ",
		icon: "/mobility/retailer.png",
		slug: "supervisor-app",
	},
	{
		title: "Retailer App ",
		desc: "Help retailers log service calls, manage claims and support customers seamlessly through a dedicated partner portal. ",
		icon: "/mobility/field.png",
		slug: "retailer-app",
	},
];

export default function MobilityAppsSection() {
	return (
		<section className="container-fluid mx-auto">
			{/* Heading */}
			<h2 className="heading-2 text-center mb-4">
				Field-Ready Mobility for Connected Service
			</h2>
			<p className="sub-description text-center md:max-w-[57%] mx-auto mb-16">
				Empower field teams with real-time mobile access while staying connected across technicians, offices, and customers.
			</p>

			<div className=" grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				{/* Left Features */}
				<div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10 order-2 lg:order-1">
					{apps.map((item) => (
						<div key={item.title} className="flex flex-col gap-3 items-start h-full">
							{/* Icon */}
							<div className="w-10 h-10 md:w-13.5 md:h-13.5 rounded-lg flex items-center justify-center shrink-0">
								<Image
									src={item.icon}
									alt={item.title + " icon"}
									width={40}
									height={40}
									className="object-contain w-8 h-8 md:w-10 md:h-10"
								/>
							</div>
							{/* Title */}
							<h3 className="card-matrix">
								{item.title}
							</h3>
							<p className="text-base text-gray-600 leading-relaxed">
								{item.desc}
							</p>
							<Link
								href={`/solutions/${item.slug}`}
								className="text-sm font-bold text-black cursor-pointer w-full flex justify-end transition-all duration-300 hover:text-blue-600 hover:translate-x-1"
							>
								Learn More →
							</Link>
						</div>
					))}
				</div>

				{/* Right Side Main Image */}
				<div className="w-full h-full flex items-center justify-center order-1 lg:order-2">
					<Image
						src="/mobility/image.png"
						alt="Mobility Main Preview"
						width={800}
						height={800}
						className="object-contain w-full h-full"
					/>
				</div>
			</div>
		</section>
	);
}