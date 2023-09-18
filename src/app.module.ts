import { Module } from '@nestjs/common';
import { AlertModule } from './alert/alert.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AlertModule,
    // ClientsModule.register([
    //   { name: 'ALERT', transport: Transport.TCP, options: { port: 5000 } },
    // ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// 백엔드에서 이벤트 생김 알려주고 -> 마.소가 웹소켓으로 보내주기 (커넥션을 맺을수있는 api 가 있어야한다.), 레디스(pubsub)
// DB에 대한 의존성 적어져서 이사가기 편하다(portability)

// 웹소켓 / 클라이언트에게 메시지 보내는건 다 얘가 보내기
// 레디스로도 알림 보낼수있당
// 웹소켓서버를 스케일아웃해서 여러개 띄우면
// nginx 리버스 프록시, 로드밸런싱 생각해보기
// push api (웹푸시) 오바이다
// SSE : 서버에서 브라우저로 직접 쏴주는거 / V 웹소켓이랑 무슨 차이인가요?

// 채팅기능
// 레디스(pubsub), 카프카 : 제일 안정성 높다 속도는 살짝 포기, 레빗mq(속도에 치중된 친구라서 갖고있도록 설정은 되어있는데 기본은 아니당) >> pubsub publisher subscribe
// 메시지는 카프카
// 토끼는 광고성 안가두되는거

// 이미지를 돌돌만다

// nodejs는 싱글스레드라 cpu를 쓰는 작업에 약하다 cpu intensive 한 작업에 약하다
// cpu 를 많이 쓰는 작업 https 복호화 암호화, http body 압축 node.js 가 하면 느리다.
// nginx 는 node.js 보다 훨씬 빠르다. 그래서 위에 두개 nginx 가 해줌

// 같은 컨테이너 안에 nginx + node.js 도커
// HA구성 동일한 노드서버 여러개 두기 >> 신경쓸거 // 웹소켓 a,b,c 서로 패싱해 줄 것이냐; 세션 쓰고있으면 왔다갔다하기 그것도 레디스가 굿굿 (토큰이면 ㄱㅊㄱㅊ 사실 토큰을 이래서 쓰는거다)
// 로드밸런싱 LB
// 라운드로빈 알고리즘이 기본인데 바꿀수잇따
// pm2 쓰면 편하다
// node.js 클러스터 기능 Pm2 가 잘해준다 유사 멀티 프로세싱
// 지금은 정적으로 3000,3001,3002 상류 upstream 서버
// nginx 는 다운스트림서버

// nginx 는 systemctl, node.js 만 도커컨테이너에 넣기
// nginx 를 더 많이씀

// 쿠버네티스ingress 잉그레스가 알아서 로드밸런스 해줌
// availability 가용성을 높이기 위해서

// 쿠버네티스가 도커스웜보다 좋은건 어떻게 해야 컨테이너 기반으로 무중단서비스 더 잘할까

// 12팩터? 클라우드 네이티브를 향한 팩트들
// 12팩터 앱 (구글에 쳐보기)
// 클라우드 네이티브한 앱을 만들때 고가용성 하는 팩트
// aws 같은거 쓸때 모노리스방식말고 마이크로서비스 쓰고싶으니까 고가용성으로 써야함
// 코드를 고가용성으로 유지하고 싶을때 지키면 좋은것들
// https://12factor.net/ko/

// 모놀리스 + 마이크로 => 하이브리드라고 많이씀

// 데코레이터 이해 중요,중요
