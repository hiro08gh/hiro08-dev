import { ClearButton } from "@/components/ClearButton";
import { PostContent } from "@/components/PostContent";
import { getPostDetail } from "@/libs/microcms";
import type { Metadata } from "next";
import { cookies, draftMode } from "next/headers";

type Props = {
	params: { slug: string };
};

export async function generateMetadata({
	params: { slug },
}: Props): Promise<Metadata> {
	const cookieStore = cookies();
	const draftKey = cookieStore.get("draftKey")?.value;

	const post = await getPostDetail({ contentId: slug, draftKey });

	return {
		title: `${post.title} - hiro08gh`,
		description: post.description,
	};
}

export default async function Page({
	params: { slug },
}: {
	params: { slug: string };
}) {
	const { isEnabled } = draftMode();
	const cookieStore = cookies();
	const draftKey = cookieStore.get("draftKey")?.value;

	const post = await getPostDetail({
		contentId: slug,
		draftKey,
	});

	return (
		<div className="mx-4 max-sm:py-4">
			{isEnabled && <ClearButton />}
			<PostContent post={post} />
		</div>
	);
}
