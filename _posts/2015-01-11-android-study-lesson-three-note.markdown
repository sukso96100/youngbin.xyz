---
layout: post
title: "시온고 안드로이드 스터디 노트 - 3.New Activities And Intents"
date: "2015-01-11"
tags: develop development android app study note
image : /resources/android_study_tshirts.jpg
---

Lesson 2 에 이어 Lesson 3 노트를 계속 합니다. 이번에는 스터디 맴버들이 Udacity 강의와 함께 보면서 공부 할 수 있도록. 일찍 노트를 작성하게 되었습니다.
저번 Lesson 2 에는 갑자기 어려운 내용이 나왔는대. Lesson 3 은 또 조금 쉬운 내용이내요. Udacity 강의가 하나의 앱을 개발하는 과정을 가지고 코스가 짜여있다 보니.
난이도가 들쭉날쭉 한 것 같내요. 이번 Lesson 3 에서는 새로운 Activity 를 만들고, Activity 사이에서 Intent 등을 이용해 통신하는 방법을 주로 다룹니다.

## 시작하기 앞서...
- Lesson 2 는 공부 하였나요? [안했으면 먼저 하고 오시길.](http://www.youngbin-han.kr.pe/2014/12/30/android-study-lesson-two-note.html)
- Lesson 2 에서 작성한 소스코드를 준비하세요.

## Lesson 3 내용 요약.
- OnItemClickListener - ListView 각 항목 클릭 처리
- 새 Activity 생성.
- Intent 에 대해 알아보기.
- 명시적 인텐트 (Explicit Intent) 를 이용해 Activity 이동하기.
- PreferenceActivity 를 이용해 설정화면 만들기.
- 암시적 인텐트 (Implicit Intent) 에 대해 알아보기.
- BroadcastReceiver 와 Intent Filter 에 대해 알아보기.

## OnItemClickListener 로 ListView 각 항목 클릭 처리하기.
OnItemClickListener 를 등룩하여, 각 항목별 클릭을 처리해 봅시다. 일단 지금은, ListView 에서 각 항목을 클릭하면 해당 항목 내용이 Toast 메시지로 나타나도록 해 봅시다.
먼저 OnItemClickListener 를 등룩 해 줍시다.

{% highlight java %}
public class WeatherFragment extends Fragment {
...
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ...
        mat.execute("1838716"); //myAsyncTask 실행하기
        //ListView 에 OnItemClickListener 등룩하기.
        LV.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                //각 항목 클릭시 실행될 코드를 여기에 입력합니다.
            }
        });
        return rootView;
    }
    ...
}
{% endhighlight %}

그리고 Adapter 에서 항목에 해당되는 데이터를 얻어서 Toast 메시지로 표시 해 줍시다. 아래 사진이 Toast 메시지가 나타났을 때 사진입니다. 다들 이미 많이 보셨을 겁니다.
<img src="/resources/toast_message.png"><br>
{% highlight java %}
public class WeatherFragment extends Fragment {
...
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ...
        mat.execute("1838716"); //myAsyncTask 실행하기
        //ListView 에 OnItemClickListener 등룩하기.
        LV.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                //각 항목 클릭시 실행될 코드를 여기에 입력합니다.
                String ForecastItem = myAdapter.getItem(position); //항목에 해당되는 데이터 얻기
                Toast.makeText(getActivity(), //Context 는 Activity 로부터 얻습니다.
                                ForecastItem, //Toast 로 표시할 문자열 입니다.
                                Toast.LENGTH_SHORT //Toast 메시지를 얼마나 긴 시간동안 표시할지 정합니다.
                                ).show(); // show() 메서드로 Toast 를 보여줍니다.
            }
        });
        return rootView;
    }
    ...
}
{% endhighlight %}

## Activity 하나 새로 만들기
Activity 를 하나 더 만들어 줍시다. 이 Activity 는 더 자세한 날시 정보를 표시하는대 사용 할 겁니다.
아래 사진처럼, 패키지 디렉터리를 우클릭해서, 새로운 Activity 를 만들어 주세요. Blank Activity with Fragment 을 선택하여 생성합니다.
<img src="/resources/create_new_blank_activity_with_fragment.png"><br>
이름은 DetailActivity 로 정하고, Hierarchical Parent(계층 부모)는 MainActiity 로 설정하여, 
DetailActivity 의 상위(또는 부모) Activity 가 MainActivity 가 되도록 합시다.
<img src="/resources/new_blank_activity_with_fragment.png"><br>
