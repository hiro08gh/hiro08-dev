import { PostCard } from "@/components/PostCard";
import { metadataConfig } from "@/libs/meta";
import { getPosts, getTag } from "@/libs/microcms";
import type { Metadata } from "next";

type Props = {
	params: { slug: string };
};

export async function generateMetadata({
	params: { slug },
}: Props): Promise<Metadata> {
	const tag = await getTag(slug);

	return metadataConfig({ title: tag.name });
}

export default async function Page({
	params: { slug },
}: {
	params: { slug: string };
}) {
	const posts = await getPosts(10, `tags[contains]${slug}`);
	const tag = await getTag(slug);

	if (posts.contents.length === 0) {
		return (
			<div className="mx-4 max-sm:py-4">
				<p className="text-center">記事が存在しません</p>
			</div>
		);
	}

	return (
		<div className="mx-4 max-sm:py-4 flex flex-col gap-10">
			<h2>タグ：{tag.name}</h2>
			<div>
				{posts.contents.map((post) => (
					<PostCard post={post} key={post.id} />
				))}
			</div>
		</div>
	);
}
