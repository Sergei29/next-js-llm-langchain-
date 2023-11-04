import { handleConversationPrompt } from '@/utils/serverActions/conversationChain'
import { PageLayout } from '@/components/TwoColumnLayout'
import PageHeader from '@/components/PageHeader'
import Title from '@/components/Title'
import ChatBox from './components/ChatBox'

const Memory = () => (
  <>
    <Title emoji="🧠" headingText="Memory" />
    <PageLayout>
      <PageLayout.Left>
        <PageHeader
          heading="I Remember Everything."
          boldText="Lets see if you can remember tyour favourite food. This toll will let you ask anything contained in the PDF-document."
          description="This tool uses burref memory and conversation chain. Head over to mOdule X to get started."
        />
      </PageLayout.Left>
      <PageLayout.Right>
        <ChatBox serverActionChat={handleConversationPrompt} />
      </PageLayout.Right>
    </PageLayout>
  </>
)

export default Memory
