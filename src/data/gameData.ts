import React from 'react';

export type Avatar = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export const avatars: Avatar[] = [
  { id: 'hoc-gia', name: 'Học Giả Thông Tuệ', description: 'Uyên bác, am hiểu rộng, phân tích tinh tế', icon: '📚' },
  { id: 'thi-nhan', name: 'Thi Nhân Lãng Mạn', description: 'Nhiệt huyết, ham học hỏi, năng động', icon: '🌱' },
  { id: 'nho-sinh', name: 'Nữ Sinh Trầm Tĩnh', description: 'Trầm lặng, tư duy sâu sắc, quý trọng truyền thống', icon: '📜' },
  { id: 'hanh-dong', name: 'Người Hành Động', description: 'Quyết đoán, thực tế, gắn lý thuyết với thực tiễn', icon: '⚔️' },
  { id: 'cam-xuc', name: 'Thiếu Nữ Đa Cảm', description: 'Nhạy cảm, trân trọng cái đẹp, giàu cảm xúc', icon: '❤️' },
  { id: 'an-si', name: 'Ẩn Sĩ Côn Sơn', description: 'Sáng suốt, hiểu biết rộng, cân bằng', icon: '👁️' },
];

export type QuestionType = 'mcq' | 'fill_blank' | 'multiple_select' | 'matching' | 'short_answer';

export type Quiz = {
  type: QuestionType;
  question: string;
  options?: string[]; // For MCQ, TrueFalse, MultipleSelect
  correctAnswer: string | string[] | { left: string, right: string }[]; // String for MCQ/Fill/Short, Array for MultiSelect, Object array for matching
  explanation: string;
  wrongExplanation?: string;
  conclusion: string;
  leftItems?: string[]; // For matching
  rightItems?: string[]; // For matching
};

export type Artifact = {
  name: string;
  icon: string;
  desc: string;
};

export type Zone = {
  id: string;
  title: string;
  shortDesc: string;
  lessonText: string[];
  quizzes: Quiz[];
  x: number; // Position on map (0-100)
  y: number; // Position on map (0-100)
  mobileX: number; // Position on mobile map (0-100)
  mobileY: number; // Position on mobile map (0-100)
  icon: string;
  artifact: Artifact;
  customStyle?: React.CSSProperties;
  mobileCustomStyle?: React.CSSProperties;
};

export const mapZones: Zone[] = [
  {
    id: 'thien-nhien-cam-nhan',
    title: 'THIÊN NHIÊN – CẢM NHẬN',
    shortDesc: 'Cảm nhận vẻ đẹp thiên nhiên qua những vần thơ tinh tế.',
    icon: '🌿',
    x: 20, y: 30,
    mobileX: 50, mobileY: 15,
    lessonText: [
      'Thiên nhiên trong thơ Nguyễn Trãi không chỉ là cảnh sắc, mà là một người bạn tri kỷ, là nguồn cảm hứng bất tận.',
      'Từ những vần thơ Nôm bình dị trong "Quốc âm thi tập" đến tiếng suối rì rầm nơi Côn Sơn, tất cả đều toát lên một tâm hồn nhạy cảm và tình yêu quê hương tha thiết.'
    ],
    quizzes: [
      {
        type: 'matching',
        question: 'Ghép nối các câu thơ sau với đặc điểm thiên nhiên tương ứng.',
        leftItems: [
          '1. Nước biếc non xanh thuyền gối bãi',
          '2. Hái cúc ương lan hương bén áo',
          '3. Côn Sơn suối chảy rì rầm'
        ],
        rightItems: [
          'A. Âm thanh thiên nhiên trong trẻo như tiếng đàn',
          'B. Cảnh sắc thanh bình, nhàn tản, tĩnh lặng',
          'C. Sự hòa quyện, giao cảm tinh tế giữa con người và cỏ cây'
        ],
        correctAnswer: [
          { left: '1. Nước biếc non xanh thuyền gối bãi', right: 'B. Cảnh sắc thanh bình, nhàn tản, tĩnh lặng' },
          { left: '2. Hái cúc ương lan hương bén áo', right: 'C. Sự hòa quyện, giao cảm tinh tế giữa con người và cỏ cây' },
          { left: '3. Côn Sơn suối chảy rì rầm', right: 'A. Âm thanh thiên nhiên trong trẻo như tiếng đàn' }
        ],
        explanation: 'Mỗi câu thơ thể hiện một góc nhìn, một cách cảm nhận tinh tế của Nguyễn Trãi về thiên nhiên.',
        conclusion: 'Tâm hồn Nguyễn Trãi vô cùng nhạy cảm, tinh tế và chan chứa tình yêu với cảnh sắc quê hương đất nước.'
      },
      {
        type: 'mcq',
        question: 'Ngôn ngữ chính được sử dụng trong "Quốc âm thi tập" để ghi lại những cảm xúc về thiên nhiên và đời sống là gì?',
        options: ['Chữ Hán', 'Chữ Nôm', 'Chữ Quốc ngữ', 'Tiếng Pháp'],
        correctAnswer: 'Chữ Nôm',
        explanation: 'Đây là tập thơ Nôm sớm nhất và có giá trị nhất, thể hiện ý thức tự tôn dân tộc qua ngôn ngữ.',
        conclusion: 'Sáng tạo bằng chữ Nôm giúp Nguyễn Trãi đưa những hình ảnh dân dã vào thơ ca một cách tự nhiên nhất.'
      },
      {
        type: 'mcq',
        question: 'Hình ảnh âm thanh nào nổi bật nhất trong bài "Côn Sơn ca" khi miêu tả vẻ đẹp thiên nhiên?',
        options: ['Tiếng suối chảy rì rầm', 'Tiếng súng nổ vang trời', 'Tiếng chợ búa đông đúc', 'Tiếng gió thổi mạnh'],
        correctAnswer: 'Tiếng suối chảy rì rầm',
        explanation: 'Câu thơ mở đầu: "Côn Sơn suối chảy rì rầm / Ta nghe như tiếng đàn cầm bên tai".',
        conclusion: 'Âm thanh thiên nhiên được Nguyễn Trãi cảm nhận như một bản nhạc du dương của tâm hồn.'
      }
    ],
    artifact: {
      name: 'Nghiên Mực Đá',
      icon: '🪨',
      desc: 'Nghiên mực đã mài nên những vần thơ Nôm giản dị, mộc mạc mà sâu sắc.'
    }
  },
  {
    id: 'thien-nhien-tam-hon',
    title: 'THIÊN NHIÊN – TÂM HỒN',
    shortDesc: 'Thiên nhiên là nơi sống, nơi chữa lành và giữ gìn cốt cách.',
    icon: '🍃',
    x: 40, y: 60,
    mobileX: 50, mobileY: 40,
    lessonText: [
      'Đi sâu hơn vào tâm hồn Nguyễn Trãi, thiên nhiên không chỉ để ngắm nhìn mà còn là nơi để sống, để chữa lành những vết thương lòng.',
      'Tại Côn Sơn, ông tìm thấy sự thanh thản, giữ gìn cốt cách thanh cao giữa những biến động của thời cuộc.'
    ],
    quizzes: [
      {
        type: 'multiple_select',
        question: 'Những đặc điểm nào sau đây thể hiện sự đổi mới trong tâm hồn và nghệ thuật của Nguyễn Trãi qua "Quốc âm thi tập"? (Chọn nhiều đáp án)',
        options: [
          'Đưa những hình ảnh bình dị (mùng tơi, rau muống) vào thơ.',
          'Sử dụng thể thơ Đường luật một cách cứng nhắc.',
          'Đánh dấu sự trưởng thành của ngôn ngữ dân tộc (chữ Nôm).',
          'Chỉ tập trung vào những điển tích xa lạ.'
        ],
        correctAnswer: ['Đưa những hình ảnh bình dị (mùng tơi, rau muống) vào thơ.', 'Đánh dấu sự trưởng thành của ngôn ngữ dân tộc (chữ Nôm).'],
        explanation: 'Nguyễn Trãi đã phá vỡ tính quy phạm để đưa hơi thở đời sống thực tế vào thơ ca.',
        conclusion: 'Tâm hồn ông luôn hướng về những gì gần gũi, chân thực nhất của cuộc sống.'
      },
      {
        type: 'mcq',
        question: 'Mục đích thực sự của Nguyễn Trãi khi tìm về thiên nhiên Côn Sơn là gì?',
        options: [
          'Để trốn tránh hoàn toàn mọi trách nhiệm.',
          'Để giữ cốt cách thanh cao, nhưng lòng vẫn luôn lo cho dân cho nước.',
          'Để tìm kiếm cuộc sống giàu sang chốn sơn lâm.',
          'Để quên đi quá khứ hào hùng.'
        ],
        correctAnswer: 'Để giữ cốt cách thanh cao, nhưng lòng vẫn luôn lo cho dân cho nước.',
        explanation: 'Dù ẩn cư, lòng ông vẫn "cuồn cuộn nước triều đông" lo cho vận mệnh dân tộc.',
        conclusion: 'Thiên nhiên là nơi ông nương tựa để giữ gìn lý tưởng và tâm hồn trong sạch.'
      }
    ],
    artifact: {
      name: 'Bàn Cờ Đá',
      icon: '♟️',
      desc: 'Bàn cờ nơi Ức Trai nhàn tản giữa rừng thông Côn Sơn tĩnh lặng.'
    }
  },
  {
    id: 'nhan-nghia-con-nguoi',
    title: 'NHÂN NGHĨA – CON NGƯỜI',
    shortDesc: 'Tư tưởng nhân nghĩa gắn liền với tình yêu thương nhân dân.',
    icon: '❤️',
    x: 60, y: 30,
    mobileX: 50, mobileY: 65,
    lessonText: [
      'Cốt lõi trong tư tưởng của Nguyễn Trãi là lòng thương dân vô bờ bến. Nhân nghĩa trước hết là vì dân.',
      'Trong "Bình Ngô đại cáo", ông khẳng định chân lý về đạo lý nhân nghĩa gắn liền với sự tồn vong của dân tộc.'
    ],
    quizzes: [
      {
        type: 'short_answer',
        question: 'Câu thơ "Bui một tấc lòng [___] cũ / Đêm ngày cuồn cuộn nước triều đông" nhắc đến tấm lòng lo đời, thương dân. Điền 2 chữ còn thiếu.',
        correctAnswer: 'ưu ái',
        explanation: '"Ưu" là lo, "ái" là yêu. Tấm lòng lo nước thương dân của ông luôn cháy bỏng.',
        conclusion: 'Lòng thương dân là sợi chỉ đỏ xuyên suốt cuộc đời Nguyễn Trãi.'
      },
      {
        type: 'fill_blank',
        question: 'Điền từ còn thiếu: "Việc nhân nghĩa cốt ở yên dân / Quân điếu phạt trước lo [___]".',
        correctAnswer: 'trừ bạo',
        explanation: '"Trừ bạo" là diệt trừ kẻ tàn bạo để mang lại cuộc sống bình yên cho nhân dân.',
        conclusion: 'Nhân nghĩa không phải lý thuyết suông mà là hành động vì sự bình yên của dân.'
      },
      {
        type: 'mcq',
        question: 'Mong ước lớn nhất của Nguyễn Trãi đối với nhân dân, được thể hiện qua bài thơ "Bảo kính cảnh giới" là gì?',
        options: [
          'Dân phải giàu có hơn các nước láng giềng.',
          'Dân khắp chốn cùng thôn không còn tiếng oán hờn, được no ấm.',
          'Dân phải xây dựng nhiều đền đài tráng lệ.',
          'Dân phải phục tùng tuyệt đối uy quyền.'
        ],
        correctAnswer: 'Dân khắp chốn cùng thôn không còn tiếng oán hờn, được no ấm.',
        explanation: 'Ông luôn mơ ước về một xã hội thái bình, nơi người dân lao động có cuộc sống hạnh phúc.',
        conclusion: 'Lý tưởng nhân nghĩa của ông luôn đặt lợi ích của nhân dân lên hàng đầu.'
      }
    ],
    artifact: {
      name: 'Bầu Rượu Tiên',
      icon: '🍶',
      desc: 'Bầu rượu chứa chan tấm lòng ưu ái, thương dân, trăn trở thế sự.'
    }
  },
  {
    id: 'nhan-nghia-hanh-dong',
    title: 'NHÂN NGHĨA – HÀNH ĐỘNG',
    shortDesc: 'Từ lý tưởng đến hành động thực tế cứu nước cứu dân.',
    icon: '🌄',
    x: 80, y: 60,
    mobileX: 50, mobileY: 90,
    lessonText: [
      'Nhân nghĩa không chỉ là ý tưởng, nó được hiện thực hóa qua cuộc khởi nghĩa Lam Sơn oanh liệt.',
      'Nguyễn Trãi đã kết tinh những tư tưởng vĩ đại nhất của mình vào hành động cứu quốc, đưa dân tộc thoát khỏi cảnh lầm than.'
    ],
    quizzes: [
      {
        type: 'mcq',
        question: 'Trong cuộc khởi nghĩa Lam Sơn, tư tưởng nhân nghĩa được Nguyễn Trãi cụ thể hóa như thế nào?',
        options: [
          'Chỉ dùng văn chương để thuyết phục giặc.',
          'Đánh đuổi giặc Minh để cứu nước, cứu dân khỏi cảnh lầm than.',
          'Xây dựng quân đội để đi xâm lược các nước khác.',
          'Chỉ tập trung vào việc bảo vệ hoàng tộc.'
        ],
        correctAnswer: 'Đánh đuổi giặc Minh để cứu nước, cứu dân khỏi cảnh lầm than.',
        explanation: 'Hành động thực tế nhất của nhân nghĩa lúc bấy giờ là giành lại độc lập cho tổ quốc.',
        conclusion: 'Nhân nghĩa gắn liền với lòng yêu nước và hành động cách mạng thực tiễn.'
      },
      {
        type: 'mcq',
        question: 'Nhận định nào sau đây khái quát đúng nhất về sự kết tinh tư tưởng trong thơ văn Nguyễn Trãi?',
        options: [
          'Chỉ có giá trị về mặt văn chương thuần túy.',
          'Sự kết hợp hài hòa giữa lý tưởng nhân nghĩa, yêu nước và tình yêu thiên nhiên.',
          'Chỉ là những ghi chép lịch sử khô khan.',
          'Chủ yếu là những bài học đạo đức cũ kỹ.'
        ],
        correctAnswer: 'Sự kết hợp hài hòa giữa lý tưởng nhân nghĩa, yêu nước và tình yêu thiên nhiên.',
        explanation: 'Nguyễn Trãi là sự hội tụ của một nhà tư tưởng lớn và một nghệ sĩ tài hoa.',
        conclusion: 'Sự nghiệp của ông là đài kỷ niệm tráng lệ về trí tuệ và tâm hồn Việt Nam.'
      },
      {
        type: 'fill_blank',
        question: 'Năm 1980, tổ chức [___] đã vinh danh Nguyễn Trãi là Danh nhân văn hóa thế giới.',
        correctAnswer: 'UNESCO',
        explanation: 'Sự công nhận này khẳng định tầm vóc vĩ đại của ông trên toàn thế giới.',
        conclusion: 'Nguyễn Trãi là niềm tự hào của dân tộc Việt Nam và của cả nhân loại.'
      }
    ],
    artifact: {
      name: 'Kiếm Thuận Thiên',
      icon: '⚔️',
      desc: 'Thanh gươm báu cùng Lê Lợi đánh đuổi giặc Minh, biểu tượng của chính nghĩa.'
    }
  }
];

export const generalKnowledge = {
  title: 'Kiến Thức Tổng Quan: Nguyễn Trãi',
  content: `
    Nguyễn Trãi (1380 - 1442), hiệu Ức Trai, là một nhà chính trị, nhà quân sự, nhà ngoại giao, nhà văn hóa và nhà thơ kiệt xuất của dân tộc Việt Nam.
    
    Tư tưởng cốt lõi trong sự nghiệp và thơ văn của ông là tư tưởng "Nhân nghĩa". Nhân nghĩa của Nguyễn Trãi không dừng lại ở đạo lý tu thân tề gia của Nho giáo, mà được mở rộng thành lý tưởng cứu nước, cứu dân: "Việc nhân nghĩa cốt ở yên dân / Quân điếu phạt trước lo trừ bạo".
    
    Bên cạnh một Nguyễn Trãi anh hùng, thơ văn ông còn khắc họa một Nguyễn Trãi đời thường với tình yêu thiên nhiên sâu sắc, tinh tế và một tấm lòng "ưu ái" (lo nước thương dân) luôn cuồn cuộn cháy bỏng.
    
    Ông để lại khối lượng tác phẩm đồ sộ bằng cả chữ Hán (Bình Ngô đại cáo, Ức Trai thi tập...) and chữ Nôm (Quốc âm thi tập), đóng góp to lớn vào sự phát triển của văn học và ngôn ngữ dân tộc.
  `
};
