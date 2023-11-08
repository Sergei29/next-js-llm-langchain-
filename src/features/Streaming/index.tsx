import StreamingContent from '@/components/StreamingContent'
import { PageLayout } from '@/components/TwoColumnLayout'
import PageHeader from '@/components/PageHeader'
import Title from '@/components/Title'
import { streamContentActon } from '@/utils/serverActions/streamContentAction'

const Streaming = () => {
  return (
    <>
      <Title emoji="💭" headingText="Streaming" />
      <PageLayout>
        <PageLayout.Left>
          <PageHeader
            heading="Spit a Rap."
            boldText="Nobody likes waiting for APIs to load. Use streaming to improve the user experience of chat bots."
            description="This tutorial uses streaming.  Head over to Module X to get started!"
          />
        </PageLayout.Left>
        <PageLayout.Right>
          <StreamingContent />
        </PageLayout.Right>
      </PageLayout>
    </>
  )
}

export default Streaming
